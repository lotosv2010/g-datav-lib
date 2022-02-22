import GIconArrow from './components/icon-arrow';
import GIconCross from './components/icon-cross';
import GIconMore from './components/icon-more';
import GIcon from './components/icon';
import GLoading from './components/loading';
import GFlyBox from './components/fly-box';

const install = (Vue) => {
  Vue.use(GIconArrow);
  Vue.use(GIconCross);
  Vue.use(GIconMore);
  Vue.use(GIcon);
  Vue.use(GLoading);
  Vue.use(GFlyBox);
}
export default {
  install,
  GIconArrow,
  GIconCross,
  GIconMore,
  GIcon,
  GLoading,
  GFlyBox
};