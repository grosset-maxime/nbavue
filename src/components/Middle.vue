<template>
  <div
    id="middle"
    :class="{ 'show-input': randomPath, 'show-history': $store.state.showingHistory }"
    @click.self="focus"
  >
    <div
      v-if="$store.state.showingHistory"
      class="close-show-history"
      @click.self="$store.commit('showNewestRandom')"
      title="Close history"
    >
      X
    </div>
    <div
      class="random-num-ctn"
      @click="focus"
    >
      <span class="random-num">{{ randomNum }}</span>
      <span class="separator">/</span>
      <span class="range-max-num">{{ rangeMaxNum }}</span>
    </div>

    <div
      v-if="$store.state.randomFolder"
      class="random-path-ctn"
      @click="focus"
    >
      <input
        type="text"
        class="input-random-path"
        readonly="readonly"
        ref="randomPathInput"
        :value="randomPath"
        :size="randomPathInputSize"
      >
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
      } else {
        this.$store.dispatch('getRandom').then(() => this.focus());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#middle {
  padding: 0 5px;
  position: relative;

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

  .close-show-history {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    cursor: pointer;
    color: #666;

    &:hover {
      background: #333;
      color: #fff;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
