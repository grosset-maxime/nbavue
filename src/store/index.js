import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BASE_URL = 'http://nba.local:8888';
const WIN_SEP = '\\';
const UNIX_SEP = '/';

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
      let separator = '';
      const { basePath } = state;
      const { repPath } = state;
      const finalRepPath = `${repPath || basePath}`;
      const finalRepPathLength = finalRepPath.length - 1;

      if (finalRepPath.lastIndexOf(UNIX_SEP) !== finalRepPathLength
        && finalRepPath.indexOf(UNIX_SEP) >= 0
      ) {
        separator = UNIX_SEP;
      } else if (finalRepPath.lastIndexOf(WIN_SEP) !== finalRepPathLength
        && finalRepPath.indexOf(WIN_SEP) >= 0
      ) {
        separator = WIN_SEP;
      } else if (finalRepPath.indexOf(UNIX_SEP) === -1
        && finalRepPath.indexOf(WIN_SEP) === -1
      ) {
        separator = WIN_SEP;
      }

      return `${finalRepPath}${separator}${state.randomFolder}`;
    },
  },
  mutations: {
    clear(state) {
      state.count = 0;
    },
    basePath(state, basePath) {
      state.basePath = basePath;
    },
    repPath(state, repPath) {
      state.repPath = repPath;
    },
    onGetRandom(state, data) {
      state.randomNum = data.randomNum;
      state.randomFolder = data.randomFolder;
      state.rangeMaxNum = data.nbFolders;
      state.count += 1;
    },
  },
  actions: {
    async getRandom({ state, commit }) {
      const url = `${BASE_URL}/?r=getRandomFolder_s`;
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePath: state.basePath,
        }),
      };

      await fetch(url, opts)
        .then((response) => response.json().then((json) => {
          console.log(json);
          commit('onGetRandom', json);
        }))
        .catch((error) => console.error(error));
    },
  },
  modules: {
  },
});
