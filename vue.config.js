module.exports = {
  devServer: {
    port: 3000,
    open: true,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:5001',
    //     changeOrigin: true,
    //   }
    // },
  },

  css: {
    loaderOptions: {
      sass: {
        // 新版本sass-loader， 将data改成prependData进行配置
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}