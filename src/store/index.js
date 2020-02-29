import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const BASE_URL = process.env.VUE_APP_BASE_URL || '';

const WIN_SEP = '\\';
const UNIX_SEP = '/';

let BASE_PATH = '';
let REP_PATH = '';

const buttons = Object.keys(process.env)
  .filter((key) => key.indexOf('VUE_APP_BUTTON_') >= 0)
  .map((b) => JSON.parse(process.env[b]));

if (buttons.length) {
  const selectedBtn = buttons.find((button) => button.selected);

  if (selectedBtn) {
    BASE_PATH = selectedBtn.basePath;
    REP_PATH = selectedBtn.repPath;
  }
}

export default new Vuex.Store({
  state: {
    count: 0,
    basePath: BASE_PATH,
    repPath: REP_PATH,
    randomNum: 0,
    rangeMaxNum: 0,
    randomFolder: '',
    inputHasFocus: false,
    histories: [],
    showingHistory: false,
    toggledHistories: false,
    historyShowed: 0,
    error: null,
    showError: false,
    buttons,
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
      state.histories = [];
      state.showingHistory = false;
      state.historyShowed = -1;
      state.randomFolder = '';
      state.randomNum = 0;
      state.rangeMaxNum = 0;
    },
    basePath(state, basePath) {
      state.basePath = basePath;
    },
    repPath(state, repPath) {
      state.repPath = repPath;
    },
    onGetRandom(state, data) {
      state.error = null;
      state.showError = false;
      state.showingHistory = false;
      state.historyShowed = -1;

      state.randomNum = data.randomNum;
      state.randomFolder = data.randomFolder;
      state.rangeMaxNum = data.nbFolders;
      state.count += 1;

      const history = {
        id: state.count,
        randomNum: state.randomNum,
        randomFolder: state.randomFolder,
        rangeMaxNum: state.rangeMaxNum,
      };
      state.histories.unshift(history);
    },
    onGetRandomError(state, error) {
      state.error = error;
      state.showError = true;
    },
    inputHasFocus(state, hasFocus) {
      state.inputHasFocus = hasFocus;
    },
    showHistory(state, history) {
      state.showingHistory = true;
      state.randomNum = history.randomNum;
      state.randomFolder = history.randomFolder;
      state.rangeMaxNum = history.rangeMaxNum;
      state.historyShowed = history.id;
    },
    showNewestRandom(state) {
      state.showingHistory = false;
      state.historyShowed = -1;

      const history = state.histories[0];

      state.randomNum = history.randomNum;
      state.randomFolder = history.randomFolder;
      state.rangeMaxNum = history.rangeMaxNum;
    },
    toggleHistories(state) {
      state.toggledHistories = !state.toggledHistories;
    },
  },
  actions: {
    async getRandom({ state, commit }) {
      const url = `${BASE_URL}/api/getRandomFolder`;
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
          // console.log(json);
          if (json.success) {
            commit('onGetRandom', json);
          } else {
            commit('onGetRandomError', json.error);
          }
        }))
        .catch((error) => {
          // console.error(error);
          const e = { publicMessage: error.toString() };
          commit('onGetRandomError', e);
        });
    },
  },
  modules: {
  },
});
