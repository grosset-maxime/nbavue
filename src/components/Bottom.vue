<template>
  <div class="history-ctn">
    <div
      class="header"
      v-if="count"
    >
      <span class="label">History:</span>
      <span>({{ count }})</span>
      <v-btn
        @click="toggleHistories"
        :x-small="true"
      >
        Toggle view
      </v-btn>
      <v-btn
        @click="clear"
        :x-small="true"
      >
        Clear
      </v-btn>
    </div>
    <div
      class="history-list"
      ref="historyList"
    >
      <History
        v-for="history in histories"
        :key="history.id"
        :history="history"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import History from './History.vue';

export default {
  name: 'Bottom',
  components: {
    History,
  },
  computed: {
    ...mapState(['count', 'histories']),
  },
  methods: {
    ...mapMutations(['clear', 'toggleHistories']),
  },
  updated() {
    this.$refs.historyList.scrollTop = 0;
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
button {
  margin-left: 15px;
}
.label {
  padding-right: 5px;
}
.history-list {
  $historyHeight: 37px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: auto;
  margin-top: 10px;
  height: ($historyHeight + 8) * 2;

  .history {
    height: $historyHeight;
  }
}
</style>
