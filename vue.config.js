module.exports = {
  /** publicPath: 基本路径  type: string  default: '/'  */
  publicPath: "./",
  /** outputDir: 输出文件目录  type: string  default: 'dist' */
  outputDir: 'dist',
  /** assetsDir: 放置生成静态文件目录(js,css,img,fonts)  type: string  default: ''*/
  assetsDir: 'static',
  /** indexPath: html输出路径  type: string  default: 'index.html' */
  indexPath: 'index.html',
  /** lintOnSave: 保存检测esLint规范  type: boolean  default: true */
  lintOnSave: true,
  /** devServer: 配置webpack-dev-server行为  type: object */
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    /** proxy: 配置代理  type: string | object*/
    proxy: {
      '/ybt-backend': {
        target: 'https://yyc-stard.ycb51.cn/',
        changeOrigin: true
      }
    }
  },
  /**pluginOptions: 配置第三方插件 */
  pluginOptions: {}
}