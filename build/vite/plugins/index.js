/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vue from "@vitejs/plugin-vue";
// import vueJsx from '@vitejs/plugin-vue-jsx';
// import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// import { ConfigSvgIconsPlugin } from './svgIcons';
// import { AutoRegistryComponents } from "./component";
// import { ConfigCompressPlugin } from './compress';
// import { ConfigImageminPlugin } from './imagemin';

export function createVitePlugins(isBuild) {
  const vitePlugins = [
    // vue支持
    vue(),
    // // JSX支持
    // vueJsx(),
    // // setup语法糖组件名支持
    // vueSetupExtend(),
    // // 提供https证书
    // VitePluginCertificate({
    //   source: 'coding',
    // })
  ];

  // // 自动按需引入组件
  // vitePlugins.push(AutoRegistryComponents());

  // 开启.gz压缩  rollup-plugin-gzip
  // vitePlugins.push(ConfigCompressPlugin());

  // vite-plugin-svg-icons
  // vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  //  rollup-plugin-visualizer
  // vitePlugins.push(ConfigVisualizerConfig());

  // vitePlugins.push(ConfigImageminPlugin());

  return vitePlugins;
}
