<script setup lang="ts">
import { Menu, X } from "@lucide/vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const navItems = [
  { to: "/", label: "Acasă" },
  { to: "/despre", label: "Despre Noi" },
  { to: "/anunturi", label: "Anunțuri" },
  { to: "/oferta", label: "Oferta Educațională" },
  { to: "/noutati", label: "Noutăți" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
] as const;

const open = ref(false);
const route = useRoute();

function isActive(to: string) {
  if (to === "/") return route.path === "/";
  return route.path === to || route.path.startsWith(`${to}/`);
}

const desktopLinkClass = computed(() => (to: string) => [
  "text-sm font-medium text-foreground/70 transition-colors hover:text-primary",
  isActive(to) ? "text-primary border-b-2 border-primary" : "",
]);

const mobileLinkClass = computed(() => (to: string) => [
  "block rounded-xl px-4 py-3 font-medium text-foreground/80 hover:bg-soft-bg hover:text-primary",
  isActive(to) ? "bg-primary/10 text-primary" : "",
]);
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-primary/10 bg-background/85 backdrop-blur-md">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <router-link
        to="/"
        class="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-primary"
        @click="open = false"
      >
        <span
          class="inline-flex h-9 w-9 -rotate-3 items-center justify-center rounded-xl bg-primary text-sm font-bold text-background shadow-sm"
        >
          G7
        </span>
        Grădinița Nr.7
      </router-link>

      <nav class="hidden items-center gap-6 lg:flex">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="desktopLinkClass(item.to)"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <router-link
        to="/contact"
        class="hidden rounded-full bg-secondary px-6 py-2.5 font-bold text-secondary-foreground transition-transform hover:scale-105 lg:inline-block"
      >
        Înscrieri
      </router-link>

      <button
        type="button"
        class="grid size-11 place-items-center rounded-full border border-primary/15 text-primary lg:hidden"
        aria-label="Meniu"
        @click="open = !open"
      >
        <X v-if="open" class="size-5" />
        <Menu v-else class="size-5" />
      </button>
    </div>

    <nav v-if="open" class="border-t border-primary/10 bg-background px-6 pb-6 pt-2 lg:hidden">
      <ul class="flex flex-col gap-1">
        <li v-for="item in navItems" :key="item.to">
          <router-link :to="item.to" :class="mobileLinkClass(item.to)" @click="open = false">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
