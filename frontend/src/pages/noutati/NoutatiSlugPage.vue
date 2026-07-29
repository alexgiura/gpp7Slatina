<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { X } from "@lucide/vue";
import { computed, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import PageHero from "@/components/PageHero.vue";
import { getArticleBySlug } from "@/services/content";

const route = useRoute();
const article = computed(() => getArticleBySlug(String(route.params.slug)));
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
  article.value
    ? {
        title: `${article.value.title} — Noutăți — Grădinița Nr. 7 Slatina`,
        meta: [
          { name: "description", content: article.value.excerpt },
          { property: "og:title", content: article.value.title },
          { property: "og:description", content: article.value.excerpt },
        ],
      }
    : {
        title: "Articol negăsit — Grădinița Nr. 7 Slatina",
        meta: [{ name: "description", content: "Articolul căutat nu a fost găsit." }],
      },
);
</script>

<template>
  <section v-if="!article" class="py-24 text-center">
    <div class="mx-auto max-w-xl px-6">
      <h1 class="mb-4 font-display text-4xl font-semibold">Articol negăsit</h1>
      <p class="mb-8 text-muted-foreground">
        Noutatea pe care o cauți nu există sau a fost mutată.
      </p>
      <router-link
        to="/noutati"
        class="inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90"
      >
        Înapoi la Noutăți
      </router-link>
    </div>
  </section>

  <template v-else>
    <PageHero :eyebrow="article.tag" :title="article.title" :subtitle="article.date" />
    <article class="py-16">
      <div class="mx-auto max-w-4xl px-6">
        <div class="mb-12 overflow-hidden rounded-[2.5rem] bg-muted/40">
          <img
            :src="article.image"
            :alt="article.title"
            class="mx-auto max-h-[36rem] w-full object-contain"
          />
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink"
          v-html="article.contentHtml"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div
          v-if="article.images && article.images.length > 0"
          class="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <button
            v-for="(src, i) in article.images"
            :key="src"
            type="button"
            class="group overflow-hidden rounded-2xl border border-border bg-muted/30 text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            @click="openLightbox(src)"
          >
            <img
              :src="src"
              :alt="`${article.title} — imagine ${i + 1}`"
              loading="lazy"
              class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        </div>

        <div class="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
          <router-link
            to="/noutati"
            class="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            ← Înapoi la Noutăți
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
          :alt="article.title"
          class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          @click.stop
        />
      </div>
    </Teleport>
  </template>
</template>
