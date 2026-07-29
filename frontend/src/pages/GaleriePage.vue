<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { ChevronLeft, ChevronRight, X } from "@lucide/vue";
import { computed, onUnmounted, ref, watch } from "vue";

import PageHero from "@/components/PageHero.vue";
import { getGalleryImages } from "@/services/content";

useHead({
  title: "Galerie — Grădinița Nr. 7 Slatina",
  meta: [
    { name: "description", content: "Momente, ateliere și zâmbete din grădinița noastră." },
    { property: "og:title", content: "Galerie — Grădinița Nr. 7 Slatina" },
    { property: "og:description", content: "Momente, ateliere și zâmbete din grădinița noastră." },
  ],
});

const photos = getGalleryImages();
const activeIndex = ref<number | null>(null);

const activePhoto = computed(() =>
  activeIndex.value === null ? null : photos[activeIndex.value] ?? null,
);

function openLightbox(index: number) {
  activeIndex.value = index;
}

function closeLightbox() {
  activeIndex.value = null;
}

function showPrev() {
  if (activeIndex.value === null || photos.length === 0) return;
  activeIndex.value = (activeIndex.value - 1 + photos.length) % photos.length;
}

function showNext() {
  if (activeIndex.value === null || photos.length === 0) return;
  activeIndex.value = (activeIndex.value + 1) % photos.length;
}

function onKeydown(event: KeyboardEvent) {
  if (activeIndex.value === null) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPrev();
  if (event.key === "ArrowRight") showNext();
}

watch(activeIndex, (index) => {
  if (index !== null) {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeydown);
  } else {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKeydown);
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <PageHero
    eyebrow="Galerie"
    title="Zâmbete, în fiecare zi."
    subtitle="O fereastră spre viața din grădiniță — momentele care contează cel mai mult."
  />
  <section class="py-20">
    <div class="mx-auto max-w-6xl px-6">
      <p v-if="photos.length === 0" class="text-center text-muted-foreground">
        Adaugă imagini în folderul <code class="text-sm">src/assets/gallery</code> pentru a le
        afișa aici.
      </p>

      <div v-else class="columns-2 gap-4 md:columns-3 md:gap-5 lg:columns-4">
        <button
          v-for="(p, i) in photos"
          :key="p.src"
          type="button"
          class="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:mb-5"
          @click="openLightbox(i)"
        >
          <img
            :src="p.src"
            :alt="p.alt"
            loading="lazy"
            class="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="activePhoto"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Imagine mărită"
      @click="closeLightbox"
    >
      <button
        type="button"
        class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Închide"
        @click="closeLightbox"
      >
        <X class="h-6 w-6" />
      </button>

      <button
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:left-6"
        aria-label="Imaginea anterioară"
        @click.stop="showPrev"
      >
        <ChevronLeft class="h-7 w-7" />
      </button>

      <img
        :src="activePhoto.src"
        :alt="activePhoto.alt"
        class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        @click.stop
      />

      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-6"
        aria-label="Imaginea următoare"
        @click.stop="showNext"
      >
        <ChevronRight class="h-7 w-7" />
      </button>

      <p class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
        {{ (activeIndex ?? 0) + 1 }} / {{ photos.length }}
      </p>
    </div>
  </Teleport>
</template>
