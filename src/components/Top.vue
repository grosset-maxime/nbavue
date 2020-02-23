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
          class="generate-btn pink white--text"
          tabindex="3"
          @click.once="getRandom"
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
  },
  methods: {
    ...mapActions(['getRandom']),
    ...mapMutations(['inputHasFocus']),
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
</style>
