<script setup lang="ts">
import { useHead } from "@unhead/vue";

import engleza from "@/assets/program-engleza.jpg";
import mare from "@/assets/program-mare.jpg";
import mica from "@/assets/program-mica.jpg";
import mijlocie from "@/assets/program-mijlocie.jpg";
import hero from "@/assets/hero-kids.jpg";
import PageHero from "@/components/PageHero.vue";

useHead({
  title: "Galerie — Grădinița Nr. 7 Slatina",
  meta: [
    { name: "description", content: "Momente, ateliere și zâmbete din grădinița noastră." },
    { property: "og:title", content: "Galerie — Grădinița Nr. 7 Slatina" },
    { property: "og:description", content: "Momente, ateliere și zâmbete din grădinița noastră." },
  ],
});

const photos = [
  { src: hero, alt: "Copii jucându-se cu cuburi colorate", span: "row-span-2" },
  { src: mica, alt: "Joc cu inele de lemn", span: "" },
  { src: mijlocie, alt: "Activități Montessori", span: "" },
  { src: mare, alt: "Învățăm alfabetul", span: "row-span-2" },
  { src: engleza, alt: "Atelier de engleză", span: "" },
  { src: hero, alt: "Grupa noastră", span: "" },
];
</script>

<template>
  <PageHero
    eyebrow="Galerie"
    title="Zâmbete, în fiecare zi."
    subtitle="O fereastră spre viața din grădiniță — momentele care contează cel mai mult."
  />
  <section class="py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <figure
          v-for="(p, i) in photos"
          :key="i"
          :class="`group relative overflow-hidden rounded-[1.5rem] border-4 border-card shadow-sm ${p.span}`"
        >
          <img
            :src="p.src"
            :alt="p.alt"
            loading="lazy"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
      </div>
    </div>
  </section>
</template>
