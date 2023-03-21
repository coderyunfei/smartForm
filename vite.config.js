import { createVitePlugins } from "./build/vite/plugins";
import path from "path";
import autoprefixer from "autoprefixer";
import proxy from "./build/vite/proxy";

// https://vitejs.dev/config/
export default ({ command }) => {
  const isBuild = command === "build";
  let base;
  if (command === "build") {
    base = "/smartForm/";
  } else {
    base = "/";
  }
  return {
    base,
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.join(__dirname, "/src"),
        },
      ],
    },
    // plugins
    plugins: createVitePlugins(isBuild),

    // css
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
            ],
            grid: true,
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          // 注意，键名是scss不是sass！
          // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
          additionalData: `
                    @import './src/assets/scss/index.scss';
                `,
        },
      },
    },
    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 3000, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: "0.0.0.0", // IP配置，支持从IP启动
      proxy,
    },
  };
};
