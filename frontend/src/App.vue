<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";
import { useRouter } from "vue-router";

import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const router = useRouter();
const error = ref<Error | null>(null);
const retryKey = ref(0);

onErrorCaptured((err) => {
  const asError = err instanceof Error ? err : new Error(String(err));
  console.error(asError);
  error.value = asError;
  reportLovableError(asError, { boundary: "vue_root_error_component" });
  return false;
});

function reset() {
  error.value = null;
  retryKey.value += 1;
  router.replace(router.currentRoute.value.fullPath);
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <SiteHeader v-if="!error" />
    <main class="flex-1">
      <div v-if="error" class="flex min-h-screen items-center justify-center bg-background px-4">
        <div class="max-w-md text-center">
          <h1 class="text-xl font-semibold tracking-tight text-foreground">
            This page didn't load
          </h1>
          <p class="mt-2 text-sm text-muted-foreground">
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              @click="reset"
            >
              Try again
            </button>
            <a
              href="/"
              class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
      <router-view v-else :key="retryKey" />
    </main>
    <SiteFooter v-if="!error" />
  </div>
</template>
