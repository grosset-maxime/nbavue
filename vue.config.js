module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/_myVariables.scss";',
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
