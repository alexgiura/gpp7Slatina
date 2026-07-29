<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { Clock, Mail, MapPin, Phone } from "@lucide/vue";

import ContactFormField from "@/components/ContactFormField.vue";
import ContactInfoItem from "@/components/ContactInfoItem.vue";
import PageHero from "@/components/PageHero.vue";

useHead({
  title: "Contact — Grădinița cu Program Prelungit Nr. 7 Slatina",
  meta: [
    { name: "description", content: "Programări, vizite și înscrieri. Suntem aici pentru tine." },
    { property: "og:title", content: "Contact — Grădinița Nr. 7 Slatina" },
    {
      property: "og:description",
      content: "Programări, vizite și înscrieri. Suntem aici pentru tine.",
    },
  ],
});

function handleSubmit() {
  alert("Mulțumim! Te contactăm în curând.");
}
</script>

<template>
  <PageHero
    eyebrow="Contact"
    subtitle="Te așteptăm la o vizită ghidată sau răspundem la orice întrebare prin telefon sau email."
  >
    <template #title>Hai să ne <span class="italic text-primary">cunoaștem</span>.</template>
  </PageHero>
  <section class="py-20">
    <div class="mx-auto grid max-w-6xl items-stretch gap-10 px-6 lg:grid-cols-2">
      <div
        class="flex flex-col justify-between gap-6 rounded-[2.5rem] border border-border bg-card p-8 shadow-sm"
      >
        <div>
          <h2 class="mb-2 font-display text-2xl font-bold">Date de contact</h2>
          <p class="text-muted-foreground">
            Suntem aici pentru tine. Ne poți contacta sau vizita la una dintre locații.
          </p>
        </div>
        <ContactInfoItem
          :icon="MapPin"
          title="Corp A"
          body="Str. Toamnei nr. 6, bl. 6, parter, Slatina, 230003"
        />
        <ContactInfoItem
          :icon="MapPin"
          title="Corp B"
          body="Aleea Lalelelor nr. 1C, Slatina, 230032"
        />
        <ContactInfoItem :icon="Phone" title="Telefon" body="0349 414 423" />
        <ContactInfoItem :icon="Mail" title="Email" body="gpp7slatina@yahoo.ro" />
        <ContactInfoItem :icon="Clock" title="Program" body="Luni – Vineri: 08:00 – 18:00" />
      </div>
      <form
        class="rounded-[2.5rem] border border-border bg-card p-8 shadow-sm"
        @submit.prevent="handleSubmit"
      >
        <h2 class="mb-6 font-display text-2xl font-bold">Trimite-ne un mesaj</h2>
        <div class="space-y-4">
          <ContactFormField label="Nume" type="text" name="nume" required />
          <ContactFormField label="Email" type="email" name="email" required />
          <ContactFormField label="Telefon" type="tel" name="telefon" />
          <div>
            <label class="mb-1.5 block text-sm font-bold text-foreground">Mesaj</label>
            <textarea
              name="mesaj"
              rows="3"
              required
              class="w-full rounded-2xl border-2 border-border bg-soft-bg px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Trimite mesajul
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
