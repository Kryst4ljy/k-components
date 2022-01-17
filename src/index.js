import SelectTree from '../packages/SelectTree/index.js';
import VirtualList from '../packages/VirtualList/index.js';

const components = [SelectTree, VirtualList];

const install = (Vue) => {
  // 注册组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // 这里可以操作Vue
  // Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  SelectTree,
  VirtualList,
};
