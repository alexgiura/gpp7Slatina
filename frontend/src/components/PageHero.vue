<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string;
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
  },
);
</script>

<template>
  <section class="relative overflow-hidden border-b border-primary/10 bg-card pt-16 pb-20">
    <div class="absolute -top-20 -left-20 size-72 rounded-full bg-secondary/20 blur-3xl" />
    <div class="absolute -bottom-20 -right-20 size-72 rounded-full bg-primary/15 blur-3xl" />
    <div class="relative mx-auto max-w-4xl px-6 text-center">
      <span
        class="mb-6 inline-block rounded-full bg-sky-tint px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.4_0.08_220)]"
      >
        {{ eyebrow }}
      </span>
      <h1 class="mb-6 font-display text-5xl font-semibold leading-[1.1] text-ink lg:text-6xl">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="subtitle" class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {{ subtitle }}
      </p>
      <slot />
    </div>
  </section>
</template>
