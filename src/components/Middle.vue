<template>
  <div id="middle" :class="{ hasInput: randomPath }" @click="focus">
    <div class="random-num-ctn">
      <span class="random-num">{{ randomNum }}</span>
      <span class="separator">/</span>
      <span class="range-max-num">{{ rangeMaxNum }}</span>
    </div>

    <div v-if="$store.state.randomFolder" class="random-path-ctn">
      <input type="text" class="input-random-path" readonly="readonly"
        ref="randomPathInput"
        :value="randomPath"
        :size="randomPathInputSize"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Middle',
  props: {
    basePath: {
      type: String,
      required: false,
      default: '',
    },
    repPath: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    randomNum() {
      return this.$store.state.randomNum || '-';
    },
    rangeMaxNum() {
      return this.$store.state.rangeMaxNum || '-';
    },
    randomPathInputSize() {
      return this.$store.getters.randomPath.length;
    },
    ...mapGetters(['randomPath']),
  },
  methods: {
    focus() {
      const el = this.$refs.randomPathInput;
      if (el) {
        el.focus();
        el.select();
        document.execCommand('copy');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#middle {
  padding: 0 5px;

  .random-num-ctn {
    line-height: 5em;

    .random-num {
      font-size: 10.625em;
    }

    .separator,
    .range-max-num {
      font-size: 4em;
    }
  }

  .random-path-ctn {
    width: 100%;
    text-align: center;

    .input-random-path {
      padding: 6px;
      color: #888;
      font-size: 1em;
      max-width: 100%;
    }
  }
}
</style>
