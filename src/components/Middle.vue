<template>
  <div :class="{ hasInput: randomPath }" @click="focus">
    <div class="random-num-ctn">
      <span class="random-num">{{randomNum}}</span>
      <span class="separator">/</span>
      <span class="range-max-num">{{rangeMaxNum}}</span>
    </div>

    <div v-if="randomPath" class="random_path_ctn">
      <input type="text" id="input-random-path" readonly="readonly"
        ref="randomPathInput"
        v-model="randomPath"
      />
    </div>

  </div>
</template>

<script>

export default {
  name: 'Middle',
  props: {
    basePath: {
      type: String,
      required: false,
      default: 'oueoueoue',
    },
    repPath: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      randomNum: 0,
      rangeMaxNum: 0,
    };
  },
  computed: {
    randomPath() {
      return this.basePath;
    },
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
    generate() {
      // this;
    },
  },
};
</script>

<style lang="scss" scoped>
.random-num-ctn {
  line-height: 5em;
}

.random-num {
  font-size: 10.625em;
}

.separator,
.range-max-num {
  font-size: 4em;
}

#input-random-path {
  padding: 6px;
  color: #888;
  font-size: 1em;
}
</style>
