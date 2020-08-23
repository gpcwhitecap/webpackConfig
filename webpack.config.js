/* eslint-disable linebreak-style */
// resolve 用于拼接绝对路径的方法
const {
  resolve,
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将js中的css提取出单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  // webpack 配置

  // 入口起点
  entry: ['./src/index.js'],
  // 输出
  output: {
    // 输出名
    filename: 'js/built.[contenthash:6].js',
    // 输出路径
    // __dirname nodejs 的变量，代表当前文件的目录绝对路径
    path: `${__dirname}/build`,
  },
  // loader的配置 loader--翻译官
  module: {
    rules: [
      // 详细loader配置
      {
        // 语法检查
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        oneOf: [
          {
            // 匹配那些文件正则
            test: /\.css$/,
            // 使用那些loader
            use: [
              // use数据中loader执行顺序：从右到左 从上到下
              // 创建style标签，讲js里的样式资源插入进行，添加到head
              // 'style-loader',
              //  MiniCssExtractPlugin取代style-loader. 提取js中的css成单独的文件
              MiniCssExtractPlugin.loader,
              // 将css文件变成commonjs模块加载js中，形成样式字符串
              'css-loader',
              // css兼容处理
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => {
                    require('postcss-preset-env')();
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')(),
                  ],
                },
              },
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
              outputPath: 'media',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    //   按需加载兼容
                    useBuiltIns: 'usage',
                    // 指定corejs版本
                    corejs: {
                      version: 3,
                    },
                    // 指定兼容到那个版本
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '11',
                    },
                    modules: false,

                  },

                ]],
              cacheDirectory: true,

            },
          },

        ],
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
      // 压缩html
      minify: {
        //   移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      // 输出css 进行重命名
      filename: 'css/built.[contenthash:6].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
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
    // 开启HMR功能
    hot: true,
  },
  // 将node_modules单独输入一个JS
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'eval-source-map',
};
