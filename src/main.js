import { createApp } from "vue";
import element from "@/common/element/components";
import "element-plus/lib/theme-chalk/index.css";

import i18n from "@/lang";
import App from "./App.vue";
import router from "./router";

import { setupDirectives } from "./directives/index";

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: "small", zIndex: 3000 };
// 注册 element 组件 插件
element(app);
app.use(router);
app.use(i18n);
setupDirectives(app); //注册全局指令
app.mount("#app");
