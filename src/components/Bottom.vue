<template>
  <div class="history-ctn">
    <header v-if="count">
      <span class="label">History:</span>
      <span>({{count}})</span>
      <button>Toggle view</button>
      <button @click="clear">Clear</button>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Bottom',
  computed: {
    ...mapState(['count']),
  },
  methods: {
    ...mapMutations(['clear']),
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
}
button {
  margin-left: 15px;
}
.label {
  padding-right: 5px;
}
</style>
