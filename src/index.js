import GIconArrow from './components/icon-arrow';
import GIconCross from './components/icon-cross';
import GIconMore from './components/icon-more';
import GIcon from './components/icon';
import GLogo from './components/logo';
import GLoading from './components/loading';
import GFlyBox from './components/fly-box';
import GContainer from './components/container';
import GVueCountTo from './components/vue-count-to';
import GVueEcharts from './components/vue-echarts';

const install = (Vue) => {
  Vue.use(GIconArrow);
  Vue.use(GIconCross);
  Vue.use(GIconMore);
  Vue.use(GIcon);
  Vue.use(GLoading);
  Vue.use(GFlyBox);
  Vue.use(GContainer);
  Vue.use(GLogo);
  Vue.use(GVueCountTo);
  Vue.use(GVueEcharts);
}
export default {
  install,
  GIconArrow,
  GIconCross,
  GIconMore,
  GIcon,
  GLoading,
  GFlyBox,
  GContainer,
  GLogo,
  GVueCountTo,
  GVueEcharts
};