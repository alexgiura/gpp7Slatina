<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { Download, ExternalLink } from "@lucide/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import PageHero from "@/components/PageHero.vue";
import { getAnnouncementBySlug } from "@/services/content";

const route = useRoute();
const anunt = computed(() => getAnnouncementBySlug(String(route.params.slug)));

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
        <div class="mb-10 flex flex-wrap items-center gap-3">
          <a
            :href="anunt.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ExternalLink class="h-4 w-4" />
            Deschide PDF
          </a>
          <a
            :href="anunt.pdf"
            download
            class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            <Download class="h-4 w-4" />
            Descarcă PDF
          </a>
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="anunt.contentHtml"
          class="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink"
          v-html="anunt.contentHtml"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div
          v-if="anunt.images && anunt.images.length > 0"
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(src, i) in anunt.images"
            :key="src"
            class="overflow-hidden rounded-2xl border border-border"
          >
            <img
              :src="src"
              :alt="`${anunt.title} — imagine ${i + 1}`"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
          <router-link
            to="/anunturi"
            class="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            ← Înapoi la Anunțuri
          </router-link>
        </div>
      </div>
    </article>
  </template>
</template>
