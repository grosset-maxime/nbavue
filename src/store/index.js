import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const getters = {
//   articlesCount(state) {
//     return state.articlesCount;
//   },
//   articles(state) {
//     return state.articles;
//   },
//   isLoading(state) {
//     return state.isLoading;
//   },
//   tags(state) {
//     return state.tags;
//   }
// };

export default new Vuex.Store({
  state: {
    count: 0,
    basePath: '',
    repPath: '',
  },
  mutations: {
    clear(state) {
      state.count = 0;
    },
    generate(state) {
      state.count += 1;
    },
  },
  actions: {
  },
  modules: {
  },
});
