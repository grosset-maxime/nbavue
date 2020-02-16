<template>
  <div>
    <div class="base-path-ctn flex-row">
      <label for="input-base-path">Base path:</label>
      <div class="input-ctn flex-row">
        <input v-model="basePath" id="input-base-path" type="text" :placeholder="basePlaceholder" />
      </div>
      <div class="generate-btn-ctn flex-row">
        <button class="generate-btn">Generate</button>
      </div>
    </div>
    <div class="rep-path-ctn flex-row">
      <label for="input-rep-path">Replacement path:</label>
      <div class="input-ctn flex-row">
        <input v-model="repPath" id="input-rep-path" type="text" :placeholder="repPlaceholder" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Top',
  data() {
    return {
      basePath: '',
      basePlaceholder: 'Enter your base path here...',
      repPath: '',
      repPlaceholder: 'Enter your replacement path here...',
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  white-space: nowrap;
  cursor: pointer;
}

input {
  width: 100%;
  padding-left: 4px;
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
    padding: 0 5px;
  }
  label {
    flex: 0 1 auto;
    min-width: 4.7em;
  }
}
</style>
