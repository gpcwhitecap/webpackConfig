/* eslint-disable linebreak-style */
// resolve 用于拼接绝对路径的方法
const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack 配置

  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs 的变量，代表当前文件的目录绝对路径
    path: `${__dirname}/build`,
  },
  // loader的配置 loader--翻译官
  module: {
    rules: [
      // 详细loader配置
      {
        // 匹配那些文件正则
        test: /\.css$/,
        // 使用那些loader
        use: [
          // use数据中loader执行顺序：从右到左 从上到下
          // 创建style标签，讲js里的样式资源插入进行，添加到head
          'style-loader',
          // 将css文件变成commonjs模块加载js中，形成样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // hash:10 取图片hash的前10位，ext取文件原本的扩展名
          name: '[hash:10].[ext]',
          // 图片大小小于8kb，base64处理
          limit: 8 * 1024,
          esModule: false, // 低版本关闭es6解析 使用commonjs解析
          // 输出路径
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // 处理html中img解析
        loader: 'html-loader',
      },
      {
        // 打包其他资源 exclude排除正则资源
        exclude: /\.(css|js|html|less)$/,
        loader: 'flie-loader',
        options: {
          name: '[hash:10].[ext]',
        },
        outputPath: 'media',
      },
    ],
  },
  // plugins的配置 plugins 插件
  plugins: [
    // plugins配置
    // html-webpack-plugin
    new HtmlWebpackPlugin({
      // 复制路径html，并引入打包文件
      template: './src/index.html',
    }),
  ],
  // 模式  production生产环境 development开发模式
  mode: 'development',

  // 开发服务器 devServer: 自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer的命令为： npx webpack-dev-server
  devServer: {
    // 构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    // open: true,
  },
};
