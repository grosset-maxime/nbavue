<template>
  <form @submit.prevent="getRandom">
    <div class="base-path-ctn flex-row">
      <label for="input-base-path">Base path:</label>
      <div class="input-ctn flex-row">
        <input
          v-model.trim="basePath"
          id="input-base-path"
          type="text"
          :placeholder="basePlaceholder"
          tabindex="1"
          @focus="inputHasFocus(true)"
          @blur="inputHasFocus(false)"
          @keyup.enter="getRandom"
        >
      </div>

      <div class="generate-btn-ctn flex-row">
        <v-btn
          :small="true"
          :color="'primary'"
          class="generate-btn"
          tabindex="3"
          @click="getRandom"
          @keydown.prevent=""
        >
          Generate
        </v-btn>
      </div>
    </div>

    <div class="rep-path-ctn flex-row">
      <label for="input-rep-path">Replacement path:</label>
      <div class="input-ctn flex-row">
        <input
          v-model.trim="repPath"
          id="input-rep-path"
          type="text"
          :placeholder="repPlaceholder"
          tabindex="2"
          @focus="inputHasFocus(true)"
          @blur="inputHasFocus(false)"
          @keyup.enter="getRandom"
        >
      </div>
    </div>

    <div
      class="btns-ctn flex-row"
      v-if="buttons.length"
    >
      <v-btn
        v-for="(button, index) in buttons"
        :key="index"
        @click="onButtonClick(button, index)"
        :x-small="true"
        :color="'orange lighten-1'"
        :outlined="selectedBtnIndex !== index"
      >
        {{ button.text }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'Top',
  data() {
    return {
      basePlaceholder: 'Enter your base path here...',
      repPlaceholder: 'Enter your replacement path here...',
      selectedBtnIndex: -1,
    };
  },
  computed: {
    basePath: {
      get() {
        return this.$store.state.basePath;
      },
      set(basePath) {
        this.$store.commit('basePath', basePath);
      },
    },
    repPath: {
      get() {
        return this.$store.state.repPath;
      },
      set(repPath) {
        this.$store.commit('repPath', repPath);
      },
    },
    buttons() {
      return this.$store.state.buttons;
    },
  },
  watch: {
    $route() {
      this.updateSelectedBtnIndex();
    },
  },
  methods: {
    updateSelectedBtnIndex() {
      const queryKeys = Object.keys(this.$route.query);
      if (queryKeys.length) {
        const index = this.buttons.findIndex((button) => queryKeys.indexOf(button.name) >= 0);
        if (index >= 0) {
          this.selectedBtnIndex = index;
        }
      }
    },
    onButtonClick(btn, index) {
      this.basePath = btn.basePath;
      this.repPath = btn.repPath;
      this.selectedBtnIndex = index;
      this.getRandom();
    },
    ...mapActions(['getRandom']),
    ...mapMutations(['inputHasFocus']),
  },
  mounted() {
    const index = this.$store.state.buttons.findIndex((button) => button.selected);
    if (index >= 0) {
      this.selectedBtnIndex = index;
    }
    this.updateSelectedBtnIndex();
  },
};
</script>

<style lang="scss" scoped>
label {
  white-space: nowrap;
  cursor: pointer;
}

input[type=text] {
  width: 100%;
  padding-left: 4px;
  height: 1.5em;
}

.base-path-ctn {
  flex: 1 1 auto;
  min-width: 100%;

  .input-ctn {
    flex: 1 1 auto;
    padding: 0 5px;
  }
  label {
    flex: 0 1 auto;
    min-width: 4.7em;
  }
  .generate-btn-ctn {
    flex: 0 1 auto;
  }
}

.rep-path-ctn {
  flex: 1 1 auto;
  min-width: 100%;

  .input-ctn {
    flex: 1 1 auto;
    padding-left: 5px;
  }
  label {
    flex: 0 1 auto;
    min-width: 4.7em;
  }
}

.btns-ctn {
  height: 30px;

  .v-btn {
    margin-left: 15px;
  }
}
</style>
