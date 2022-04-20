import store from "../index";
import axios from "axios";

const state = {
  stories: [],
};
const getters = {
  allStories: (state) => state.stories,
};
const actions = {
  async fetchStories({ commit }) {
    const response = await axios.get("http://localhost:3005/stories");
    commit("setStories", response.data);
  },
};
const mutations = {
  setStories: (state, stories) => (state.stories = stories),
};

export default {
  state,
  getters,
  actions,
  mutations
}