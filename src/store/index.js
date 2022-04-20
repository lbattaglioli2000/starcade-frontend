import { createStore } from "vuex";
import stories from "./modules/stories";

export default createStore({
  modules: {
    stories
  }
});
