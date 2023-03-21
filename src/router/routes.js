const home = () => import("@/pages/home/index.vue");
const about = () => import("@/pages/about/index.vue");
const Page404 = () => import("@/components/Page404.vue");

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: Page404,
  },
];

export default routes;
