import GIconArrow from './components/icon-arrow';
import GIconCross from './components/icon-cross';
import GIconMore from './components/icon-more';
import GIcon from './components/icon';

const install = (Vue) => {
  Vue.use(GIconArrow);
  Vue.use(GIconCross);
  Vue.use(GIconMore);
  Vue.use(GIcon);
}
export default {
  install,
  GIconArrow,
  GIconCross,
  GIconMore,
  GIcon
};