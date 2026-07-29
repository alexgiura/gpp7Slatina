<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  title: string;
  body: string;
}>();
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
      <component :is="icon" class="size-5" />
    </div>
    <div class="min-w-0">
      <h3 class="font-display text-base font-bold">{{ title }}</h3>
      <p class="text-sm text-muted-foreground">{{ body }}</p>
    </div>
  </div>
</template>
