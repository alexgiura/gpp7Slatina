<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="mt-24 rounded-t-[3rem] bg-[oklch(0.22_0.02_250)] py-20 text-slate-300">
    <div class="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="mb-6 flex items-center gap-2">
          <div
            class="grid size-9 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground"
          >
            G7
          </div>
          <span class="font-display text-lg font-semibold leading-tight text-white">
            Grădinița cu Program<br />Prelungit Nr. 7 Slatina
          </span>
        </div>
        <p class="leading-relaxed text-slate-400">
          Împreună pentru copiii noștri — un spațiu sigur și prietenos în centrul Slatinei, unde
          copiii învață, se joacă și cresc cu încredere.
        </p>
      </div>

      <div>
        <h5 class="mb-6 font-display font-bold text-white">Link-uri Utile</h5>
        <ul class="space-y-4">
          <li>
            <router-link to="/" class="transition-colors hover:text-primary">Acasă</router-link>
          </li>
          <li>
            <router-link to="/despre" class="transition-colors hover:text-primary"
              >Despre Noi</router-link
            >
          </li>
          <li>
            <router-link to="/oferta" class="transition-colors hover:text-primary"
              >Oferta Educațională</router-link
            >
          </li>
          <li>
            <router-link to="/galerie" class="transition-colors hover:text-primary"
              >Galerie</router-link
            >
          </li>
          <li>
            <router-link to="/noutati" class="transition-colors hover:text-primary"
              >Noutăți</router-link
            >
          </li>
        </ul>
      </div>

      <div>
        <h5 class="mb-6 font-display font-bold text-white">Contact</h5>
        <ul class="space-y-4 text-sm leading-relaxed">
          <li>
            <span class="block font-semibold text-slate-200">Corp A</span>
            Str. Toamnei nr. 6, bl. 6, parter<br />Slatina, 230003
          </li>
          <li>
            <span class="block font-semibold text-slate-200">Corp B</span>
            Aleea Lalelelor nr. 1C<br />Slatina, 230032
          </li>
          <li>
            <a href="tel:+40349414423" class="transition-colors hover:text-primary">0349 414 423</a>
          </li>
          <li>
            <a href="mailto:gpp7slatina@yahoo.ro" class="transition-colors hover:text-primary"
              >gpp7slatina@yahoo.ro</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h5 class="mb-6 font-display font-bold text-white">Program</h5>
        <ul class="space-y-4 text-sm">
          <li class="flex justify-between"><span>Luni – Vineri</span><span>08:00 – 18:00</span></li>
          <li class="flex justify-between"><span>Sâmbătă</span><span>Închis</span></li>
          <li class="flex justify-between"><span>Duminică</span><span>Închis</span></li>
        </ul>
      </div>
    </div>
    <div
      class="mx-auto mt-16 max-w-7xl border-t border-white/10 px-6 pt-8 text-center text-sm text-slate-500"
    >
      © {{ year }} Grădinița cu Program Prelungit Nr. 7 Slatina. Toate drepturile rezervate.
    </div>
  </footer>
</template>
