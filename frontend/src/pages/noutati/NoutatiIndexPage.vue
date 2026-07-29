<script setup lang="ts">
import { useHead } from "@unhead/vue";

import PageHero from "@/components/PageHero.vue";
import { getNews } from "@/services/content";

const articles = getNews();

useHead({
  title: "Noutăți — Grădinița Nr. 7 Slatina",
  meta: [
    { name: "description", content: "Articole, evenimente și momente din viața de grădiniță." },
    { property: "og:title", content: "Noutăți — Grădinița Nr. 7 Slatina" },
    {
      property: "og:description",
      content: "Articole, evenimente și momente din viața de grădiniță.",
    },
  ],
});
</script>

<template>
  <PageHero
    eyebrow="Noutăți"
    title="Povești din grădiniță."
    subtitle="Articole, momente speciale și proiecte internaționale — direct din inima grupelor noastre."
  />
  <section class="py-20">
    <div class="mx-auto grid w-full max-w-7xl gap-6 px-6">
      <article
        v-for="a in articles"
        :key="a.slug"
        class="group flex flex-col gap-6 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:gap-8 md:p-8"
      >
        <div class="shrink-0 overflow-hidden rounded-2xl md:w-44 lg:w-52">
          <img
            :src="a.image"
            :alt="a.title"
            loading="lazy"
            width="400"
            height="300"
            class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:aspect-square"
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="mb-3 flex flex-wrap items-center gap-3 text-xs">
            <span
              class="rounded-full bg-accent/15 px-3 py-1 font-bold uppercase tracking-wider text-accent"
            >
              {{ a.tag }}
            </span>
            <span class="font-medium uppercase tracking-widest text-muted-foreground">
              {{ a.date }}
            </span>
          </div>
          <h3 class="mb-3 font-display text-xl font-bold leading-tight md:text-2xl lg:text-3xl">
            {{ a.title }}
          </h3>
          <p class="mb-4 text-base leading-relaxed text-muted-foreground">{{ a.excerpt }}</p>
          <router-link
            :to="{ name: 'noutati-slug', params: { slug: a.slug } }"
            class="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Citește mai mult →
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>
