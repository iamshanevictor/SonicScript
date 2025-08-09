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
    regionsPlugin.value.getRegions().forEach(r => { try { r.remove(); } catch {} });
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
      } catch (e) {}
    });
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
