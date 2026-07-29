<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { ExternalLink } from "@lucide/vue";

import PageHero from "@/components/PageHero.vue";
import { getEducationalOffer } from "@/services/content";

useHead({
  title: "Oferta Educațională — Grădinița Nr. 7 Slatina",
  meta: [
    {
      name: "description",
      content:
        "Oferta educațională anuală: situația grupelor de preșcolari pentru fiecare an școlar.",
    },
    { property: "og:title", content: "Oferta Educațională — Grădinița Nr. 7 Slatina" },
    {
      property: "og:description",
      content:
        "Oferta educațională anuală: situația grupelor de preșcolari pentru fiecare an școlar.",
    },
  ],
});

const oferte = getEducationalOffer();
</script>

<template>
  <PageHero
    eyebrow="Oferta educațională"
    title="Ofertele educaționale pentru fiecare an școlar."
    subtitle="Aici publicăm anual situația grupelor de preșcolari și documentele aferente."
  />
  <section class="py-20">
    <div class="mx-auto grid w-full max-w-7xl gap-6 px-6">
      <article
        v-for="o in oferte"
        :key="o.title"
        class="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-10"
      >
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span
            class="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
          >
            {{ o.tag }}
          </span>
          <span class="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {{ o.date }}
          </span>
        </div>

        <h2 class="mb-6 font-display text-2xl font-bold leading-tight md:text-3xl">
          {{ o.title }}
        </h2>

        <div>
          <a
            :href="o.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ExternalLink class="h-4 w-4" />
            Deschide PDF
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
