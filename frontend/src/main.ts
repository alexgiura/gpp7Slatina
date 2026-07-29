import { createHead } from "@unhead/vue/client";
import { createApp } from "vue";

import App from "./App.vue";
import { reportLovableError } from "./lib/lovable-error-reporting";
import { router } from "./router";
import "./styles.css";

const app = createApp(App);
const head = createHead();

app.config.errorHandler = (err, _instance, info) => {
  console.error(err, info);
  reportLovableError(err, { boundary: "vue_app_error_handler", info });
};

app.use(head);
app.use(router);
app.mount("#app");
