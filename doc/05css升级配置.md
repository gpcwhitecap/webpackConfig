# 将js中的css提取出单独的文件 

> 需要下载mini-css-extract-plugin 


` npm i mini-css-extract-plugin  -D `

# css 兼容性处理

> postcss --> postcss-loader postcss-preset-env
> package.json 中配置browserslist，通过配置加载指定的css兼容版本，更多配置github搜browserslist

` npm i postcss-loader postcss-preset-env -D `

# css 压缩

` npm i optimize-css-assets-webpack-plugin -D `