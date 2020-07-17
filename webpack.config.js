// resolve 用于拼接绝对路径的方法
const { resolve } = require('path');


module.exports = {
    //webpack 配置

    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出名
        filename: 'built.js',
        // 输出路径
        // __dirname nodejs 的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname,'build')
    },
    // loader的配置 loader--翻译官
    module: {
        rules: [
            // 详细loader配置
            {
                //匹配那些文件正则
                test: /\.css$/,
                // 使用那些loader
                use: [
                    // use数据中loader执行顺序：从右到左 从上到下
                    // 创建style标签，讲js里的样式资源插入进行，添加到head
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，形成样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置 plugins 插件
    plugins: [

    ],
    // 模式  production生产环境 development开发模式
    mode: 'development',
}