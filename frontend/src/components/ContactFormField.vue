<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    type: string;
    name: string;
    required?: boolean;
  }>(),
  {
    required: false,
  },
);
</script>

<template>
  <div>
    <label class="mb-1.5 block text-sm font-bold text-foreground">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :required="required"
      class="w-full rounded-2xl border-2 border-border bg-soft-bg px-4 py-3 outline-none transition-colors focus:border-primary"
    />
  </div>
</template>
