<template>
  <div class="history-ctn">
    <div
      class="header"
      v-if="count"
    >
      <span class="label">History:</span>
      <span>({{ count }})</span>
      <button>Toggle view</button>
      <button @click="clear">
        Clear
      </button>
    </div>
    <div class="history-list">
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
import History from '@/components/History.vue';


export default {
  name: 'Bottom',
  components: {
    History,
  },
  computed: {
    ...mapState(['count', 'histories']),
  },
  methods: {
    ...mapMutations(['clear']),
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
}
button {
  margin-left: 15px;
}
.label {
  padding-right: 5px;
}
.history-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: auto;
  margin-top: 10px;
}
</style>
