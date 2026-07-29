<script setup lang="ts">
import { useHead } from "@unhead/vue";

import despreHero from "@/assets/despre-hero.jpg";
import PageHero from "@/components/PageHero.vue";

useHead({
  title: "Despre Noi — Grădinița Nr. 7 Slatina",
  meta: [
    {
      name: "description",
      content: "Povestea, valorile și echipa Grădiniței cu Program Prelungit Nr. 7 Slatina.",
    },
    { property: "og:title", content: "Despre Noi — Grădinița Nr. 7 Slatina" },
    {
      property: "og:description",
      content: "Povestea, valorile și echipa Grădiniței cu Program Prelungit Nr. 7 Slatina.",
    },
  ],
});

const values = [
  { icon: "🤝", title: "Responsabilitate", desc: "Ne asumăm fiecare copil și familia lui." },
  { icon: "🌱", title: "Cooperare", desc: "Lucrăm împreună pentru binele copiilor." },
  { icon: "💛", title: "Generozitate", desc: "Oferim căldură, înțelegere și sprijin." },
  { icon: "🎨", title: "Creativitate", desc: "Încurajăm exprimarea liberă și jocul." },
  { icon: "🛡️", title: "Respect", desc: "Respectăm copilul, familia și profesia." },
  { icon: "⭐", title: "Profesionalism", desc: "Educație de calitate, bazată pe încredere." },
];
</script>

<template>
  <PageHero
    eyebrow="Despre noi"
    subtitle="Grădinița cu Program Prelungit Nr. 7 Slatina — un spațiu educațional cald și sigur, în centrul orașului, unde fiecare copil este încurajat să crească, să descopere și să se bucure de copilărie."
  >
    <template #title
      >Împreună pentru <span class="italic text-primary">copiii noștri</span>.</template
    >
  </PageHero>

  <!-- Scurt istoric -->
  <section class="py-20">
    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
      <div class="overflow-hidden rounded-[3rem] border-8 border-card shadow-xl">
        <img
          :src="despreHero"
          alt="Masă de activități creative în grădiniță"
          loading="lazy"
          class="aspect-square w-full object-cover"
        />
      </div>
      <div>
        <h2 class="mb-6 font-display text-4xl font-bold">Cine suntem</h2>
        <p class="mb-4 text-lg leading-relaxed text-muted-foreground">
          Grădinița cu Program Prelungit Nr. 7 Slatina a fost înființată în anul 1980, într-un
          spațiu care a avut inițial destinația de creșă. De-a lungul anilor, prin implicarea celor
          care au condus instituția, a întregului personal, a comunității locale și a fostei
          Întreprinderi de Utilaj Alimentar, grădinița și-a schimbat în permanență înfățișarea și
          dotarea.
        </p>
        <p class="text-lg leading-relaxed text-muted-foreground">
          Astăzi, cele două corpuri de clădire din zona centrală a orașului oferă un cadru
          educațional și ambiental propice pentru cei 294 de copii care ne trec pragul zilnic.
        </p>
      </div>
    </div>
  </section>

  <!-- Viziune și misiune -->
  <section class="bg-soft-bg py-20">
    <div class="mx-auto max-w-4xl px-6 text-center">
      <h2 class="mb-4 font-display text-4xl font-bold">Viziunea și misiunea noastră</h2>
      <p class="mb-10 text-sm font-bold uppercase tracking-widest text-primary">
        Satisfacerea completă a nevoilor copiilor și părinților
      </p>

      <blockquote
        class="mx-auto mb-12 max-w-2xl rounded-[2.5rem] border border-border bg-card p-10 shadow-sm"
      >
        <p class="font-display text-2xl font-medium leading-relaxed text-foreground">
          „Educația timpurie – o poartă deschisă către o educație durabilă și de calitate."
        </p>
      </blockquote>

      <p class="text-lg leading-relaxed text-muted-foreground">
        Misiunea noastră este de a fi o instituție de învățământ care oferă tuturor copiilor șanse
        egale de dezvoltare și educație. Contribuim, cu profesionalism, la dezvoltarea liberă,
        creatoare și armonioasă a personalității copiilor, prin activități care stimulează
        dezvoltarea intelectuală, afectivă, socială și fizică a fiecărui preșcolar.
      </p>
    </div>
  </section>

  <!-- Valori / Cultura organizațională -->
  <section class="py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-12 text-center">
        <h2 class="mb-4 font-display text-4xl font-bold">Cultura organizațională</h2>
        <p class="text-lg text-muted-foreground">
          Sloganul care ne unește:
          <span class="font-semibold text-foreground">„Împreună pentru copiii noștri!"</span>
        </p>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="v in values"
          :key="v.title"
          class="rounded-[2rem] border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-md"
        >
          <div
            class="mb-4 grid size-14 place-items-center rounded-2xl bg-soft-bg text-3xl shadow-sm"
          >
            {{ v.icon }}
          </div>
          <h3 class="mb-2 font-display text-xl font-bold">{{ v.title }}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ v.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Bază materială și echipă -->
  <section class="bg-card py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="mb-6 font-display text-3xl font-bold">Baza materială</h2>
          <p class="mb-4 text-lg leading-relaxed text-muted-foreground">
            Grădinița dispune de o bază materială la standarde ridicate, în ambele corpuri de
            clădire:
          </p>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>11 săli de grupă</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>2 cabinete de consiliere școlară și 2 cabinete director</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>2 cabinete administrator, 2 săli de mese, vestiare</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>2 bucătării, 5 băi, 2 spălătorii, 2 magazii de alimente</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span
                >2 terenuri de joacă, mobilier, calculatoare, televizoare, DVD-playere, materiale
                didactice</span
              >
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 font-display text-3xl font-bold">Echipa noastră</h2>
          <p class="mb-4 text-lg leading-relaxed text-muted-foreground">
            În prezent, grădinița are 294 de copii înscriși, îngrijiți de o echipă dedicată:
          </p>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>22 de cadre didactice calificate</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>4 asistente medicale</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>1 administrator de patrimoniu și 1 muncitor de întreținere</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span>4 bucătărese și 11 angajați din personalul de îngrijire</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 block size-2 rounded-full bg-primary" />
              <span
                >Colaboratori: medic școlar, administrator financiar, logoped, consilier
                școlar</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Diagnoza mediului intern -->
  <section class="py-20">
    <div class="mx-auto max-w-4xl px-6 text-center">
      <h2 class="mb-8 font-display text-4xl font-bold">Diagnoza mediului intern</h2>
      <blockquote
        class="mx-auto mb-10 max-w-3xl rounded-[2.5rem] border border-border bg-soft-bg p-10 shadow-sm"
      >
        <p class="text-lg leading-relaxed text-foreground">
          „Grădinița cu Program Prelungit Nr. 7 Slatina este caracterizată printr-un ethos
          profesional bun. Trăsăturile dominante sunt cooperarea, munca în echipă, respectul
          reciproc, atașamentul față de copii, respectul pentru profesie, libertatea de exprimare."
        </p>
      </blockquote>
      <p class="text-lg leading-relaxed text-muted-foreground">
        Climatul organizației este deschis, stimulativ și dinamic. Relațiile dintre cadrele
        didactice sunt colegiale, de respect și sprijin reciproc. Întregul personal are
        posibilitatea să își pună în valoare <strong>creativitatea</strong>,
        <strong>profesionalismul</strong> și <strong>responsabilitatea</strong>. Managementul este
        transparent, flexibil și bazat pe încrederea în oameni.
      </p>
    </div>
  </section>

  <!-- Informații cantitative și calitative -->
  <section class="bg-soft-bg py-20">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-12 text-center">
        <h2 class="mb-3 font-display text-4xl font-bold">Informații despre grădiniță</h2>
        <p class="text-lg text-muted-foreground">
          Date și context despre structura grupelor și mediul educațional.
        </p>
      </div>

      <div class="space-y-10">
        <div>
          <h3 class="mb-5 font-display text-2xl font-bold">Structura grupelor</h3>
          <p class="mb-5 text-muted-foreground">
            Exemplu de structură a grupelor, an școlar 2017–2018:
          </p>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="rounded-2xl border border-border bg-card p-6">
              <h4 class="mb-3 font-display text-lg font-bold">Corp A — 144 preșcolari</h4>
              <ul class="space-y-1 text-sm text-muted-foreground">
                <li>Mică A: 20</li>
                <li>Mijlocie A: 31 · Mijlocie B: 26</li>
                <li>Mare A: 28 · Mare B: 23 · Mare E (repetare): 16</li>
              </ul>
            </div>
            <div class="rounded-2xl border border-border bg-card p-6">
              <h4 class="mb-3 font-display text-lg font-bold">Corp B — 150 preșcolari</h4>
              <ul class="space-y-1 text-sm text-muted-foreground">
                <li>Mică B: 30</li>
                <li>Mijlocie C: 30 · Mijlocie D: 29</li>
                <li>Mare C: 32 · Mare D: 29</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-5 font-display text-2xl font-bold">Mediul educațional și social</h3>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="rounded-2xl border border-border bg-card p-6">
              <h4 class="mb-2 font-display text-lg font-bold">Ambianță</h4>
              <p class="text-muted-foreground">
                Educatoare cu rezultate deosebite, implicate în proiecte și parteneriate, preocupate
                de dezvoltare profesională continuă.
              </p>
            </div>
            <div class="rounded-2xl border border-border bg-card p-6">
              <h4 class="mb-2 font-display text-lg font-bold">Mediul social</h4>
              <p class="text-muted-foreground">
                Familii din toate mediile sociale — venituri mari, medii și mici — inclusiv părinți
                aflați în căutarea unui loc de muncă sau plecați în străinătate, familii care au
                nevoie de sprijin și familii de etnie romă.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
