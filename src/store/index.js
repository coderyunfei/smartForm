import { createStore } from "vuex";
import dingtalk from "./modules/dingtalk";

export default createStore({
  // getters,
  // actions,
  // mutations,
  modules: {
    dingtalk,
  },
});
