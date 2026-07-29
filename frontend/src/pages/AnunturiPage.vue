<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { Download, ExternalLink } from "@lucide/vue";

import PageHero from "@/components/PageHero.vue";
import { getAnnouncements } from "@/services/content";

useHead({
  title: "Anunțuri — Grădinița Nr. 7 Slatina",
  meta: [
    { name: "description", content: "Toate anunțurile și informările pentru părinți." },
    { property: "og:title", content: "Anunțuri — Grădinița Nr. 7 Slatina" },
    { property: "og:description", content: "Toate anunțurile și informările pentru părinți." },
  ],
});

const anunturi = getAnnouncements();
</script>

<template>
  <PageHero
    eyebrow="Anunțuri"
    title="La zi cu tot ce contează."
    subtitle="Aici găsești toate informările oficiale, ședințele și schimbările de program."
  />
  <section class="py-20">
    <div class="mx-auto grid w-full max-w-7xl gap-6 px-6">
      <article
        v-for="a in anunturi"
        :key="a.slug ?? a.title"
        class="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-10"
      >
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span
            class="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
          >
            Anunț
          </span>
          <span class="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {{ a.date }}
          </span>
        </div>

        <h2 class="mb-6 font-display text-2xl font-bold leading-tight md:text-3xl">
          {{ a.title }}
        </h2>

        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="a.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ExternalLink class="h-4 w-4" />
            Deschide PDF
          </a>
          <router-link
            v-if="a.slug"
            :to="{ name: 'anunturi-slug', params: { slug: a.slug } }"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            Citește mai mult →
          </router-link>
          <a
            v-else
            :href="a.pdf"
            download
            class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            <Download class="h-4 w-4" />
            Descarcă PDF
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
