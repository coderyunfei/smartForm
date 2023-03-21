// 默认主题的配置
export default {
  state: {
    themeConfig: {
      bgColor: "", //背景颜色
      bgUrl: "", // 背景图片
      isBgColor: true, // 是否用背景颜色
      isHeadImg: true, //是否要头图
      headImgUrl: "", //头图的图片地址
      contentBgColor: "", //内容背景色
      isDefaultComponentColor: true, //组件相关颜色是否用默认的颜色
      componentColor: "", //组件相关颜色
      componentDisplay: "top", //组件布局默认上下布局
      isDefaultLogo: true, // 是否是默认logo展示
      selfLogoUrl: "", //企业logo图片（包括品牌logo以及网页图标）
      bottomGuideContent: "", // 网页底部引导文案
      logoLinkUrl: "", // 点击后跳转链接
    },
  },
  getters: {
    defaultThemeConfig: (state) => state.themeConfig,
  },
  mutations: {
    SET_DEFAULT_THEME_CONFIG(state, val) {
      state.themeConfig = val;
    },
  },
  actions: {
    // 更新列表页筛选 排序的字段或字段值
    setDefaultThemeConfig({ commit, state }, val) {
      commit("SET_DEFAULT_THEME_CONFIG", val);
    },
  },
};
