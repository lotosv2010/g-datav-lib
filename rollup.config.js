import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';

const inputPath = path.resolve(__dirname, './src/index.js');
const outputUmdPath = path.resolve(__dirname, './dist/datav.js');
const outputEsPath = path.resolve(__dirname, './dist/datav.es.js');

export default {
  input: inputPath, // 必须
  output: [{
    file: outputUmdPath,    // 必须
    format: 'umd',  // 必须
    name: 'datav',
    globals: {
      vue: 'Vue', // 告诉rollup全局变量Vue即是vue
      echarts: "Echarts"
    },
    // exports: 'named'
  }, {
    file: outputEsPath,    // 必须
    format: 'es',  // 必须
  }],
  plugins: [
    // !!! plugin 有序，vue要在前面调用
    vue(), // 支持vue文件
    nodeResolve(), // 支持外部引用
    commonjs(), // 支持commonjs文件
    babel({ 
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }), // 支持babel
    json(), // 支持json文件
    postcss({
      plugins: []
    }), // 支持scss文件
  ],
  external: ['vue', 'echarts']
}