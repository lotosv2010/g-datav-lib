import Test1 from './components/test1';
import Test2 from './components/test2';
import Test3 from './components/test3';

// function test1 (Vue) {
//   Vue.use(Test1);
// }
// function test2 (Vue) {
//   Vue.use(Test2);
// }
// function test3 (Vue) {
//   Vue.use(Test3);
// }

const install = (Vue) => {
  Vue.use(Test1);
  Vue.use(Test2);
  Vue.use(Test3);
}
export default {
  install,
  Test1,
  Test2,
  Test3
};