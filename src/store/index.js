import Vue from "vue";
import Vuex from "vuex";
import warframes from "./modules/warframes.js";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    warframes,
  },
  strict: debug,
});
