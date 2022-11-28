const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://ti8249.natappfree.cc',
        target: 'http://172.16.0.41:8083//',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
})