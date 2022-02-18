const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase'); // 引入驼峰命名函数
const componentsConf = require('../../components.json'); // 引入 components.json
const { fileSave } = require('../../src/utils/file');

// 1.先检测是否传入了组件名参数
if (!process.argv[2]) {
  console.error('请输入组件名 - 驼峰式命名');
  return;
}

const componentName = uppercamelcase(process.argv[2]); // 新建组件名
const componentPath = path.join(__dirname, '../../components.json'); // components.json 绝对路径

// 2.判断是否已经存在此组件
if (componentsConf[componentName]) {
  console.error('组件名已存在~');
  return;
}

// 3.写入 components.json 配置文件
componentsConf[componentName] = `./packages/${componentName}/index.js`;
fileSave(componentPath, JSON.stringify(componentsConf, null, '  '));

// 4.在 package 目录下创建对应组件文件，并填充模版
const packagePath = path.join(__dirname, '../../packages', componentName); // 当前组件绝对路径
const tempFile = [
  {
    filename: 'index.js',
    content: `import ${componentName} from './src/main.vue';

/* istanbul ignore next */
${componentName}.install = function (Vue) {
  Vue.component(${componentName}.name, ${componentName});
};

export default ${componentName};`,
  },
  {
    filename: 'src/main.vue',
    content: `<template>
  <div></div>
</template>
  
<script>
export default {
  name: '${componentName}'
};
</script>`,
  },
];
tempFile.forEach((m) => {
  fileSave(path.join(packagePath, m.filename), m.content);
});

console.log('Done!');
