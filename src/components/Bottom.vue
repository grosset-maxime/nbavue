<template>
  <div class="history-ctn">
    <header>
      <span class="label">History:</span>
      <span>({{count}})</span>
      <button>Toggle view</button>
      <button>Clear</button>
    </header>
  </div>
</template>

<script>

export default {
  name: 'Bottom',
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
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
