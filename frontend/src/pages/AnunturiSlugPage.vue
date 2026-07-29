<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { ExternalLink, X } from "@lucide/vue";
import { computed, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import PageHero from "@/components/PageHero.vue";
import { getAnnouncementBySlug } from "@/services/content";

const route = useRoute();
const anunt = computed(() => getAnnouncementBySlug(String(route.params.slug)));
const lightboxSrc = ref<string | null>(null);

function openLightbox(src: string) {
  lightboxSrc.value = src;
}

function closeLightbox() {
  lightboxSrc.value = null;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeLightbox();
}

watch(lightboxSrc, (src) => {
  if (src) {
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

useHead(() =>
  anunt.value
    ? {
        title: `${anunt.value.title} — Anunțuri — Grădinița Nr. 7 Slatina`,
        meta: [
          { name: "description", content: anunt.value.title },
          { property: "og:title", content: anunt.value.title },
          { property: "og:description", content: anunt.value.title },
        ],
      }
    : {
        title: "Anunț negăsit — Grădinița Nr. 7 Slatina",
        meta: [{ name: "description", content: "Anunțul căutat nu a fost găsit." }],
      },
);
</script>

<template>
  <section v-if="!anunt" class="py-24 text-center">
    <div class="mx-auto max-w-xl px-6">
      <h1 class="mb-4 font-display text-4xl font-semibold">Anunț negăsit</h1>
      <p class="mb-8 text-muted-foreground">
        Anunțul pe care îl cauți nu există sau a fost mutat.
      </p>
      <router-link
        to="/anunturi"
        class="inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90"
      >
        Înapoi la Anunțuri
      </router-link>
    </div>
  </section>

  <template v-else>
    <PageHero eyebrow="Anunț" :title="anunt.title" :subtitle="anunt.date" />
    <article class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="mb-10">
          <a
            :href="anunt.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ExternalLink class="h-4 w-4" />
            Deschide PDF
          </a>
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="anunt.contentHtml"
          class="space-y-6 text-lg leading-relaxed text-ink"
          v-html="anunt.contentHtml"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div v-if="anunt.images && anunt.images.length > 0" class="mt-12 grid gap-8">
          <button
            v-for="(src, i) in anunt.images"
            :key="src"
            type="button"
            class="group overflow-hidden rounded-2xl border border-border text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            @click="openLightbox(src)"
          >
            <img
              :src="src"
              :alt="`${anunt.title} — imagine ${i + 1}`"
              class="w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </button>
        </div>

        <div class="mt-16 border-t border-border pt-8">
          <router-link
            to="/anunturi"
            class="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            ← Înapoi la Anunțuri
          </router-link>
        </div>
      </div>
    </article>

    <Teleport to="body">
      <div
        v-if="lightboxSrc"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
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
        <img
          :src="lightboxSrc"
          :alt="anunt.title"
          class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          @click.stop
        />
      </div>
    </Teleport>
  </template>
</template>
