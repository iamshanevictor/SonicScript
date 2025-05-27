<template>
  <div class="source-item" :class="{ 'selected': isSelected }" @click="toggleSelect">
    <span class="source-type material-symbols-outlined" :style="{ color: getTypeColor(type) }">
      {{ getTypeIcon(type) }}
    </span>
    <span class="source-name">{{ name }}</span>
    <div class="source-actions">
      <button class="action-btn" @click.stop="$emit('delete')">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'audio'
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select', 'edit', 'delete']);

const isSelected = ref(props.selected);

const getTypeIcon = (type) => {
  switch (type) {
    case 'audio':
      return 'mic';
    case 'document':
      return 'description';
    case 'folder':
      return 'folder';
    default:
      return 'description';
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'audio':
      return 'var(--accent-red)';
    case 'document':
      return 'var(--accent-blue)';
    case 'folder':
      return 'var(--accent-yellow)';
    default:
      return 'var(--text-secondary)';
  }
};

const toggleSelect = () => {
  isSelected.value = !isSelected.value;
  emit('select', isSelected.value);
};
</script>

<style scoped>
.source-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  color: var(--text-primary);
}

.source-item:hover {
  background-color: var(--bg-hover);
}

.source-item.selected {
  background-color: var(--bg-selected);
}

.source-type {
  margin-right: 10px;
  font-size: 20px;
}

.source-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}

.source-actions {
  display: none;
  gap: 4px;
}

.source-item:hover .source-actions {
  display: flex;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.action-btn .material-symbols-outlined {
  font-size: 18px;
}
</style> 