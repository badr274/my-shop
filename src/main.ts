import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
// @ts-ignore
import VueVirtualScroller from "vue3-virtual-scroller";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { register } from "swiper/element/bundle";

register();
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.use(VueVirtualScroller);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

app.mount("#app");
