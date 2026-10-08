<script setup lang="ts">
import { useHead } from "@unhead/vue";

import collageCladire from "@/assets/collage-cladire.jpg";
import collageCurte from "@/assets/collage-curte.jpg";
import heroHome from "@/assets/hero-home.jpg";
import engleza from "@/assets/program-engleza.jpg";
import mare from "@/assets/program-mare.jpg";
import mica from "@/assets/program-mica.jpg";
import mijlocie from "@/assets/program-mijlocie.jpg";

useHead({
  title: "Grădinița cu Program Prelungit Nr. 7 Slatina — Împreună pentru copiii noștri",
  meta: [
    {
      name: "description",
      content:
        "Un spațiu sigur și prietenos, în centrul Slatinei, unde copiii învață, se joacă și cresc cu încredere.",
    },
    { property: "og:title", content: "Grădinița cu Program Prelungit Nr. 7 Slatina" },
    {
      property: "og:description",
      content:
        "Un spațiu sigur și prietenos, în centrul Slatinei, unde copiii învață, se joacă și cresc cu încredere.",
    },
  ],
});

const stats = [
  { n: "40+", l: "Ani de experiență" },
  { n: "22", l: "Cadre didactice" },
  { n: "11", l: "Grupe de preșcolari" },
  { n: "294", l: "Preșcolari înscriși" },
  { n: "41", l: "Angajați" },
];

const programe = [
  { title: "Grupa Mică", desc: "Adaptare blândă și socializare prin joc.", img: mica },
  { title: "Grupa Mijlocie", desc: "Dezvoltarea autonomiei și curiozității.", img: mijlocie },
  { title: "Grupa Mare", desc: "Pregătire pas cu pas pentru școală.", img: mare },
  { title: "Limbi Străine", desc: "Învățare distractivă a limbii engleze.", img: engleza },
];

const spatii = [
  {
    src: collageCladire,
    alt: "Colaj cu fațada, intrarea și spațiile de festivități ale Corpului B, pe Aleea Lalelelor",
    label: "Corpul B",
    text: "Aleea Lalelelor nr. 1C — intrarea, holurile și sala în care ne întâlnim cu ocazia evenimentelor.",
    tilt: "-rotate-2",
  },
  {
    src: collageCurte,
    alt: "Colaj cu aleile, spațiul verde și locurile de joacă din curtea Corpului A, pe Str. Toamnei",
    label: "Corpul A",
    text: "Str. Toamnei nr. 6, bl. 6 — aleile, spațiul verde și locurile de joacă din curte.",
    tilt: "rotate-2",
  },
];
</script>

<template>
  <section class="relative overflow-hidden pt-16 pb-24">
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
      <div>
        <span
          class="mb-6 inline-block rounded-full bg-sky-tint px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.4_0.08_220)]"
        >
          Grădinița cu Program Prelungit Nr. 7 Slatina
        </span>
        <h1 class="mb-8 font-display text-5xl font-semibold leading-[1.1] text-ink lg:text-7xl">
          Împreună pentru <span class="italic text-primary">copiii</span> noștri.
        </h1>
        <p class="mb-10 max-w-lg text-xl leading-relaxed text-muted-foreground">
          Un spațiu sigur și prietenos, în centrul orașului Slatina, unde copiii învață, se joacă și
          cresc cu încredere.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link
            to="/contact"
            class="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
          >
            Contactează-ne
          </router-link>
          <router-link
            to="/despre"
            class="rounded-2xl border-2 border-border bg-card px-8 py-4 text-lg font-bold text-foreground transition-all hover:border-primary/30"
          >
            Află mai multe
          </router-link>
        </div>
      </div>

      <div class="relative">
        <div class="absolute -right-12 -top-12 size-64 rounded-full bg-secondary/30 blur-3xl" />
        <div
          class="relative rotate-2 overflow-hidden rounded-[3rem] border-8 border-card shadow-2xl"
        >
          <img
            :src="heroHome"
            alt="Sală de joacă și învățare din grădiniță"
            width="1200"
            height="1200"
            class="aspect-square w-full object-cover"
          />
        </div>
        <div
          class="absolute -bottom-6 -left-6 -rotate-6 rounded-3xl bg-accent p-6 text-accent-foreground shadow-xl"
        >
          <p class="font-display text-3xl font-bold">40+</p>
          <p class="text-sm font-medium opacity-90">Ani de experiență</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-soft-bg py-16">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="s in stats"
          :key="s.l"
          class="rounded-[1.5rem] border border-border bg-card p-6 text-center shadow-sm"
        >
          <p class="font-display text-3xl font-bold text-primary">{{ s.n }}</p>
          <p class="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {{ s.l }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-card py-12">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid gap-8 md:grid-cols-3">
        <router-link
          to="/anunturi"
          class="block rounded-[2rem] border border-primary/5 bg-soft-bg p-8 transition-transform hover:-translate-y-1"
        >
          <div class="mb-6 grid size-12 place-items-center rounded-2xl bg-card text-2xl shadow-sm">
            ✨
          </div>
          <h3 class="mb-3 font-display text-xl font-bold">De ce să ne alegeți?</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Colectivul didactic ține pasul cu metodele noi, consultă literatura de specialitate și
            participă la cursuri de formare — pentru un debut școlar bun.
          </p>
        </router-link>
        <router-link
          to="/despre"
          class="block rounded-[2rem] border border-sky-tint bg-sky-tint/40 p-8 transition-transform hover:-translate-y-1"
        >
          <div class="mb-6 grid size-12 place-items-center rounded-2xl bg-card text-2xl shadow-sm">
            👩‍🏫
          </div>
          <h3 class="mb-3 font-display text-xl font-bold">Echipa noastră</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            41 de angajați, dintre care 22 cadre didactice calificate, alături de personal auxiliar
            pregătit pentru sprijin educațional și social.
          </p>
        </router-link>
        <router-link
          to="/noutati"
          class="block rounded-[2rem] border border-secondary/20 bg-secondary/10 p-8 transition-transform hover:-translate-y-1"
        >
          <div class="mb-6 grid size-12 place-items-center rounded-2xl bg-card text-2xl shadow-sm">
            🎭
          </div>
          <h3 class="mb-3 font-display text-xl font-bold">Activități extracurriculare</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Educație rutieră, sănătate și ecologie, spectacole de teatru, drumeții, excursii și
            vizite tematice — în sprijinul programei instructiv-educative.
          </p>
        </router-link>
      </div>
    </div>
  </section>

  <section class="py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16 text-center">
        <h2 class="mb-4 font-display text-4xl font-bold">Despre unitatea noastră</h2>
        <p class="text-muted-foreground">
          Două corpuri în zona centrală a Slatinei, un singur suflet
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <p class="mb-3 font-display text-2xl font-bold text-primary">Fondată în 1980</p>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Cu două corpuri în zona centrală a Slatinei, oferim un cadru educațional și ambiental
            potrivit pentru cei aproximativ 294 de copii care ne trec pragul zilnic.
          </p>
        </div>
        <div class="rounded-[2rem] border border-sky-tint bg-sky-tint/40 p-8 shadow-sm">
          <p class="mb-3 font-display text-2xl font-bold text-primary">294 preșcolari</p>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Corpul A funcționează din 1980, iar Corpul B a fost deschis în 2012 — împreună găzduiesc
            11 grupe de preșcolari.
          </p>
        </div>
        <div class="rounded-[2rem] border border-secondary/20 bg-secondary/10 p-8 shadow-sm">
          <p class="mb-3 font-display text-2xl font-bold text-primary">Standarde europene</p>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Urmărim servicii educaționale de calitate, într-un climat stimulativ. Relațiile din
            unitate sunt deschise, colegiale, bazate pe respect și sprijin reciproc.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-soft-bg py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-16 text-center">
        <span
          class="mb-6 inline-block rounded-full bg-card px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.4_0.08_220)] shadow-sm"
        >
          Spațiul nostru
        </span>
        <h2 class="mb-4 font-display text-4xl font-bold">Două corpuri, o curte plină de lumină</h2>
        <p class="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
          Grădinița noastră funcționează în două clădiri diferite, în zona centrală a Slatinei. Așa
          arată fiecare dintre ele.
        </p>
      </div>

      <div class="grid gap-12 md:grid-cols-2">
        <figure v-for="c in spatii" :key="c.label" class="group">
          <div
            class="rounded-[2.75rem] border border-border bg-card p-3 shadow-xl transition-transform duration-500 group-hover:rotate-0"
            :class="c.tilt"
          >
            <div class="overflow-hidden rounded-[2.25rem] bg-secondary/15 p-4">
              <img
                :src="c.src"
                :alt="c.alt"
                loading="lazy"
                class="aspect-[3/4] w-full rounded-[1.75rem] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
          <figcaption class="mt-6 text-center">
            <p class="font-display text-xl font-bold text-ink">{{ c.label }}</p>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ c.text }}</p>
          </figcaption>
        </figure>
      </div>

      <div class="mt-14 text-center">
        <router-link
          to="/galerie"
          class="inline-flex items-center gap-2 font-bold text-primary hover:underline"
        >
          Vezi mai multe imagini în galerie →
        </router-link>
      </div>
    </div>
  </section>

  <section class="py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16 text-center">
        <h2 class="mb-4 font-display text-4xl font-bold">Oferta Noastră Educațională</h2>
        <p class="text-muted-foreground">Programe adaptate fiecărei etape de dezvoltare</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="p in programe"
          :key="p.title"
          class="group rounded-[2.5rem] border border-border bg-card p-2 shadow-sm transition-all hover:shadow-xl"
        >
          <div class="mb-6 aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted">
            <img
              :src="p.img"
              :alt="p.title"
              width="800"
              height="600"
              loading="lazy"
              class="size-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div class="px-6 pb-6 text-center">
            <h4 class="mb-2 font-display text-lg font-bold">{{ p.title }}</h4>
            <p class="text-sm text-muted-foreground">{{ p.desc }}</p>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center">
        <router-link
          to="/oferta"
          class="inline-flex items-center gap-2 font-bold text-primary hover:underline"
        >
          Vezi toate programele →
        </router-link>
      </div>
    </div>
  </section>
</template>
