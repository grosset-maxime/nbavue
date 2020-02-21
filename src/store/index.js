import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BASE_URL = 'http://nba.local:8888';

export default new Vuex.Store({
  state: {
    count: 0,
    basePath: '/Users/max/git',
    repPath: '',
    randomNum: 0,
    rangeMaxNum: 0,
    randomFolder: '',
  },
  getters: {
    randomPath(state) {
      return `${state.basePath}/${state.randomFolder}`;
    },
  },
  mutations: {
    clear(state) {
      state.count = 0;
    },
    setBasePath(state, basePath) {
      state.basePath = basePath;
    },
    onRandom(state, data) {
      state.randomNum = data.randomNum;
      state.randomFolder = data.randomFolder;
      state.rangeMaxNum = data.nbFolders;
      state.count += 1;
    },
  },
  actions: {
    async getRandom({ commit }, options) {
      const url = `${BASE_URL}/?r=getRandomFolder_s`;
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePath: options.basePath,
        }),
      };

      await fetch(url, opts)
        .then((response) => response.json().then((json) => {
          console.log(json);
          commit('onRandom', json);
        }))
        .catch((error) => console.error(error));
    },
  },
  modules: {
  },
});
