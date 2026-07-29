<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import PageHero from "@/components/PageHero.vue";
import { getArticleBySlug } from "@/services/content";

const route = useRoute();
const article = computed(() => getArticleBySlug(String(route.params.slug)));

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
        <div class="mb-12 overflow-hidden rounded-[2.5rem]">
          <img
            :src="article.image"
            :alt="article.title"
            width="1024"
            height="768"
            class="w-full object-cover"
          />
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-ink"
          v-html="article.contentHtml"
        />
        <!-- eslint-enable vue/no-v-html -->
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
  </template>
</template>
