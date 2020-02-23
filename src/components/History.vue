<template>
  <div
    class="history"
    @click="showHistory"
    :class="[{active: $store.state.historyShowed === history.id}]"
  >
    <div
      v-show="isToggled"
      class="random-num"
      :title="history.randomFolder"
    >
      <span class="random-num">{{ history.randomNum }}</span>
      <span class="separator">/</span>
      <span class="range-max">{{ history.rangeMaxNum }}</span>
    </div>

    <div
      v-show="!isToggled"
      class="random-folder"
      :title="`${history.randomNum} / ${history.rangeMaxNum}`"
      style="display: none;"
    >
      {{ history.randomFolder }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    history: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  computed: {
    isToggled() {
      return this.$store.state.toggledHistories || this.toggled;
    },
  },
  methods: {
    showHistory() {
      if (this.history.id === this.$store.state.count) {
        this.$store.commit('showNewestRandom');
      } else {
        this.$store.commit('showHistory', this.history);
      }
    },
    toggleView() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  border: 1px solid #aaa;
  background: #333;
  border-radius: 3px;
  margin-right: 6px;
  margin-bottom: 3px;
  padding: 5px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #111;
  }
  &:active {
    transform: scale(0.9);
  }

  &.active {
    background: #eee;
    color: #333;
  }

  &:first-child {
    border-color: #fff;
    background: #222;
  }

  .separator {
    padding-left: 3px;
    padding-right: 2px;
    font-size: 0.8em;
  }

  .range-max {
    font-size: 0.6em;
  }
}
</style>
