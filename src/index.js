//  webpack 起始文件
import './index.less';

function abc(a, b) {
  return a + b;
}
const a = () => `${1 + 2}aa`;
const jiantou = () => 2;
// eslint-disable-next-line no-console
console.log(a());
// eslint-disable-next-line no-console
console.log(abc());
// eslint-disable-next-line no-console
console.log(jiantou);

if (module.hot) {
  module.hot.accept('./xxx.js', () => {
    // 监听xxx.js文件是否变化，发生变化，其他默认不会重新打包 会执行后面的回调函数
    console.log(11);
  });
}
