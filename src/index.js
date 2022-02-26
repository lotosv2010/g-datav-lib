import GIconArrow from './components/icon-arrow';
import GIconCross from './components/icon-cross';
import GIconMore from './components/icon-more';
import GIcon from './components/icon';
import GLogo from './components/logo';
import GLoading from './components/loading';
import GFlyBox from './components/fly-box';
import GContainer from './components/container';

const install = (Vue) => {
  Vue.use(GIconArrow);
  Vue.use(GIconCross);
  Vue.use(GIconMore);
  Vue.use(GIcon);
  Vue.use(GLoading);
  Vue.use(GFlyBox);
  Vue.use(GContainer);
  Vue.use(GLogo);
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
  GLogo
};