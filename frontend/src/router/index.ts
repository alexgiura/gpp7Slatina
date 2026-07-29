import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/despre",
      name: "despre",
      component: () => import("@/pages/DesprePage.vue"),
    },
    {
      path: "/oferta",
      name: "oferta",
      component: () => import("@/pages/OfertaPage.vue"),
    },
    {
      path: "/anunturi",
      name: "anunturi",
      component: () => import("@/pages/AnunturiPage.vue"),
    },
    {
      path: "/anunturi/:slug",
      name: "anunturi-slug",
      component: () => import("@/pages/AnunturiSlugPage.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/pages/ContactPage.vue"),
    },
    {
      path: "/galerie",
      name: "galerie",
      component: () => import("@/pages/GaleriePage.vue"),
    },
    {
      path: "/noutati",
      component: () => import("@/pages/noutati/NoutatiLayout.vue"),
      children: [
        {
          path: "",
          name: "noutati",
          component: () => import("@/pages/noutati/NoutatiIndexPage.vue"),
        },
        {
          path: ":slug",
          name: "noutati-slug",
          component: () => import("@/pages/noutati/NoutatiSlugPage.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export { router };
