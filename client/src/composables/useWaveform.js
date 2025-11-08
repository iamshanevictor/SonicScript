import { ref } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

export function useWaveform() {
  // Core refs
  const waveformRef = ref(null);
  const wavesurfer = ref(null);
  const regionsPlugin = ref(null);

  // State refs
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(0.5);
  const zoomLevel = ref(50);

  // Selection and segments
  const selectedRegion = ref(null);
  const segments = ref([]);

  const init = (containerEl, audioUrl, initialSegments = []) => {
    if (!containerEl) return;

    // Create WaveSurfer instance
    wavesurfer.value = WaveSurfer.create({
      container: containerEl,
      waveColor: 'rgba(100, 149, 237, 0.7)',
      progressColor: 'rgb(100, 149, 237)',
      cursorColor: '#fff',
      height: 100,
      responsive: true,
      normalize: true,
      partialRender: true,
      barWidth: 0,
      barGap: 0,
      barRadius: 0,
      waveform: { type: 'line', lineWidth: 2, fillParent: true },
    });

    // Load audio and init state
    if (audioUrl) wavesurfer.value.load(audioUrl);
    wavesurfer.value.setVolume(volume.value);

    // Events
    wavesurfer.value.on('ready', () => {
      duration.value = wavesurfer.value.getDuration();
    });
    wavesurfer.value.on('audioprocess', () => {
      currentTime.value = wavesurfer.value.getCurrentTime();
    });
    wavesurfer.value.on('seek', () => {
      currentTime.value = wavesurfer.value.getCurrentTime();
    });
    wavesurfer.value.on('play', () => { isPlaying.value = true; });
    wavesurfer.value.on('pause', () => { isPlaying.value = false; });
    wavesurfer.value.on('finish', () => { isPlaying.value = false; });

    // Regions plugin and selection
    regionsPlugin.value = wavesurfer.value.registerPlugin(RegionsPlugin.create());
    regionsPlugin.value.enableDragSelection({ slop: 5, color: 'rgba(74, 111, 165, 0.4)' });
    regionsPlugin.value.on('region-created', (region) => {
      if (selectedRegion.value && selectedRegion.value.id !== region.id) {
        try { selectedRegion.value.remove(); } catch {}
      }
      selectedRegion.value = region;
    });

    // Setup initial segments
    setSegments(initialSegments);
    redrawRegions();
  };

  const destroy = () => {
    try { regionsPlugin.value = null; } catch {}
    if (wavesurfer.value) {
      try { wavesurfer.value.destroy(); } catch {}
      wavesurfer.value = null;
    }
  };

  // Controls
  const togglePlay = () => { if (wavesurfer.value) wavesurfer.value.playPause(); };
  const updateVolume = () => { if (wavesurfer.value) wavesurfer.value.setVolume(volume.value); };
  const zoomIn = () => {
    if (!wavesurfer.value) return;
    zoomLevel.value = Math.min(zoomLevel.value + 10, 100);
    wavesurfer.value.zoom(zoomLevel.value);
  };
  const zoomOut = () => {
    if (!wavesurfer.value) return;
    zoomLevel.value = Math.max(zoomLevel.value - 10, 10);
    wavesurfer.value.zoom(zoomLevel.value);
  };

  const playBetween = (start, end) => {
    if (!wavesurfer.value) return;
    wavesurfer.value.play(start, end);
  };

  // Regions helpers
  const clearSelection = () => {
    if (selectedRegion.value) {
      try { selectedRegion.value.remove(); } catch {}
      selectedRegion.value = null;
    }
  };

  const setSegments = (list = []) => {
    segments.value = (list || []).map(s => ({ ...s }));
  };

  const redrawRegions = () => {
    if (!regionsPlugin.value) return;
    
    // Get all regions and remove them - clear everything first
    let regions = regionsPlugin.value.getRegions();
    const initialCount = regions.length;
    console.log(`redrawRegions: Starting with ${initialCount} regions, ${segments.value.length} segments`);
    
    // Try to access regions through the wavesurfer instance directly
    // Sometimes the plugin's getRegions() returns stale references
    if (wavesurfer.value && wavesurfer.value.regions) {
      try {
        // Try to clear regions through wavesurfer's internal API
        const wsRegions = wavesurfer.value.regions.list;
        if (wsRegions) {
          Object.keys(wsRegions).forEach(regionId => {
            try {
              const region = wsRegions[regionId];
              if (region && typeof region.remove === 'function') {
                region.remove();
              }
            } catch (e) {
              // Ignore errors
            }
          });
        }
      } catch (e) {
        console.warn('Failed to clear regions through wavesurfer instance:', e);
      }
    }
    
    // Also try the plugin's method
    let iterations = 0;
    const maxIterations = 5;
    
    while (iterations < maxIterations) {
      regions = regionsPlugin.value.getRegions();
      if (regions.length === 0) break;
      
      // Get region IDs before attempting removal
      const regionIds = regions.map(r => r?.id).filter(Boolean);
      console.log(`redrawRegions: Attempting to remove ${regions.length} regions with IDs:`, regionIds);
      
      // Try removing each region
      regions.forEach((r, idx) => { 
        try { 
          if (r && typeof r.remove === 'function') {
            // Store the region ID before removal
            const regionId = r.id;
            r.remove();
            console.log(`redrawRegions: Called remove() on region ${regionId}`);
          }
        } catch (e) {
          console.warn(`redrawRegions: Error removing region at index ${idx}:`, e);
        }
      });
      
      // Wait a bit for removal to process
      // Get fresh list
      regions = regionsPlugin.value.getRegions();
      console.log(`redrawRegions: After removal attempt ${iterations + 1}, ${regions.length} regions remain`);
      
      iterations++;
      
      // If no change, try alternative method
      if (regions.length > 0 && iterations >= 2) {
        // Try removing by accessing DOM elements directly
        try {
          if (wavesurfer.value) {
            // Try multiple ways to access the container
            const container = wavesurfer.value.getWrapper ? wavesurfer.value.getWrapper() : 
                            wavesurfer.value.container;
            
            if (container) {
              // Find and remove region DOM elements - try multiple selectors
              const selectors = [
                '[data-region-id]',
                '.wavesurfer-region',
                '[class*="region"]',
                '[id^="region-"]',
                '[id^="segment-"]'
              ];
              
              selectors.forEach(selector => {
                try {
                  const regionElements = container.querySelectorAll(selector);
                  regionElements.forEach(el => {
                    try {
                      // Check if this element is actually a region (has start/end data)
                      if (el.getAttribute('data-start') || el.style.left) {
                        el.remove();
                        console.log(`redrawRegions: Removed region element via selector ${selector}`);
                      }
                    } catch (e) {
                      // Ignore
                    }
                  });
                } catch (e) {
                  // Ignore selector errors
                }
              });
            }
            
            // Also try accessing regions plugin's internal storage
            try {
              if (regionsPlugin.value._regions) {
                Object.keys(regionsPlugin.value._regions).forEach(id => {
                  try {
                    delete regionsPlugin.value._regions[id];
                  } catch (e) {
                    // Ignore
                  }
                });
              }
            } catch (e) {
              // Ignore
            }
          }
        } catch (e) {
          console.warn('Failed to remove regions via DOM:', e);
        }
        break;
      }
    }
    
    // Final check - if regions still exist, log them
    regions = regionsPlugin.value.getRegions();
    if (regions.length > 0) {
      console.warn(`redrawRegions: ${regions.length} regions still remain after all removal attempts:`, 
        regions.map(r => ({ id: r?.id, start: r?.start, end: r?.end })));
    }
    
    // Now create regions for all segments
    console.log(`redrawRegions: Creating ${segments.value.length} new regions`);
    segments.value.forEach((seg, idx) => {
      try {
        const region = regionsPlugin.value.addRegion({
          id: `segment-${idx}`,
          start: seg.start,
          end: seg.end,
          color: 'rgba(74, 111, 165, 0.4)',
          drag: false,
          resize: false,
        });
        seg.region = region;
        console.log(`redrawRegions: Created region segment-${idx} (${seg.start.toFixed(2)}-${seg.end.toFixed(2)})`);
      } catch (e) {
        console.warn('Error adding region during redraw:', e);
      }
    });
    
    const finalRegions = regionsPlugin.value.getRegions();
    console.log(`redrawRegions: Complete. Final region count: ${finalRegions.length}, expected: ${segments.value.length}`);
  };

  const loadUrl = (url) => {
    if (wavesurfer.value && url) wavesurfer.value.load(url);
  };

  return {
    // refs
    waveformRef,
    wavesurfer,
    regionsPlugin,
    isPlaying,
    currentTime,
    duration,
    volume,
    zoomLevel,
    selectedRegion,
    segments,
    // methods
    init,
    destroy,
    togglePlay,
    updateVolume,
    zoomIn,
    zoomOut,
    playBetween,
    clearSelection,
    setSegments,
    redrawRegions,
    loadUrl,
  };
}
