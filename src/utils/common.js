import storage from "./storage";
import * as shajs from "sha.js";

const LS = storage.LS;

// i18n init
function initI18n(lang = "zh_CN") {
  const oldLang = window.utils.LS.get("VUE_LANG") || "zh_CN";
  if (oldLang !== lang) {
    LS.set("VUE_LANG", lang);
    window.location.reload();
  }
}

// 生成签名
function createSign(value) {
  return shajs("sha256").update(value).digest("hex");
}

// 通过登录信息判断是否可以加载页面，主要针对在浏览器直接访问云呼域名的情况
function isAccessible() {
  // 本地环境直接跳过 对开发环境进行判断
  if (process.env.NODE_ENV !== "production") return true;
  // 没有corpid或者corpid是默认的1
  const isCorrectID = LS.get("corpid") === "1" || !LS.get("corpid");
  isCorrectID && alert("没有登录信息");
  return !isCorrectID;
}

export default {
  initI18n,
  isAccessible,
  createSign,
};
