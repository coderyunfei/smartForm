import store from "@/store";
import xbb from "xbb-sdk";
import xbbUtils from "@xbb/xbb-utils";
import {
  getNumberLocation,
  dialListNumber,
  getRealtimeAgentStates,
  checkCall,
  agentHeartBeat,
} from "@/api/workbench-api";
import cloudCodeAPI from "./cloudCodeAPI";
import { loadConstant } from "@/constant/index";
import lang from "@/lang";

// 国际化
let VUELang = localStorage.getItem("VUE_LANG") || "zh_CN";
VUELang = VUELang === "undefined" ? "zh_CN" : VUELang;
const i18n = lang.global.messages.value[VUELang];

const constantYy = loadConstant("yy-call-center");
const constantAli = loadConstant("ali-call-center");

// 检查呼叫中心第三方SDK是否存在
function checkSDK() {
  const facilitators = window.utils.LS.get("facilitators");
  if (facilitators === "ali-call-center") {
    // 阿里云呼的SDK
    return !!window._AgentBarSdk;
  } else if (facilitators === "yy-call-center") {
    console.log("======!!window.PhoneKit=========", !!window.PhoneKit);
    return !!window.PhoneKit;
    // let result = true
    // onlineBefore().then(res => { // 优音的SDK
    //   console.log('======!window.PhoneKit, !res.workStatus, !res.sipStatus=========', !window.PhoneKit, !res.workStatus, !res.sipStatus)
    //   if (!window.PhoneKit || !res.workStatus || !res.sipStatus) {
    //     result = false // 未登陆=>直接跳登陆界面  登陆了但是断开了连接=>手动给她做一个下线处理（与产品沟通过），与阿里云那边在用户感知上保持一致
    //   } else {
    //     result = true // 登陆了且连接（直接回到主叫页面）
    //   }
    // })
    // return result
  } else {
    const sdk = window.utils.SS.get("externalSdk");
    if (store.getters.getCallStatus === "online" && !window[sdk]) {
      cloudCodeAPI.showMessage({
        type: "warning",
        content: "请检查发布的上传代码文件",
      });
    }
    return !!window[sdk];
  }
}

// 跟进记录图标显隐
function recordIconVisible() {
  // 是否具有展示跟进记录弹窗的权限
  const recordVisible = store.getters.getRecordVisible;
  // A:头部信息不包含后面几种为true 系统无匹配信息、销帮帮云呼叫中心、转接来电、转接通话中
  const A =
    ![
      i18n.workbench.noInformation,
      i18n.workbench.callCenter,
      i18n.workbench.callTransferIn,
      i18n.workbench.callTransferEstablish,
    ].includes(store.getters.getTopMessage) && recordVisible;
  // B:部信息包含后面几种为true 转接通话中  同时  坐席状态为转接坐席咨询通话建立
  const B =
    [i18n.workbench.callTransferEstablish].includes(
      store.getters.getTopMessage
    ) &&
    store.getters.getCallStatus === "callerTransferEstablish" &&
    recordVisible;
  return A || B;
}

// 云扣接口 改变工作台大小
function sendMessage(condition, width, height) {
  if (!cloudCodeAPI.cloudCodeEnv()) return;
  // 关闭工作台、跟进记录弹窗的时候，加一个定时器，动画结束以后改变iframe宽高
  if (condition) {
    setTimeout(() => {
      xbb.sendMessage("change-window-size", {
        width: width + "px",
        height: height + 5 + "px",
      });
    }, 300);
  } else {
    xbb.sendMessage("change-window-size", {
      width: width + "px",
      height: height + 5 + "px",
    });
  }
}

// 获取客户电话
const getRealNum = (callContext) => {
  // 根据阿里云呼提供的的逻辑取实际外部电话
  const { callType, channelContexts } = callContext;
  const channel = channelContexts.find((channel) => !channel.userId);
  // 将实际外部电话存入sessionStorage 不同的calltype取不同的值
  const num = callType === "INBOUND" ? channel.originator : channel.destination;
  sessionStorage.setItem("calleeNumber", num);
  return num;
};

// 校验手机号
const checkPhone = (phone) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    console.log("手机号码不合法", phone);
    cloudCodeAPI.showMessage({
      type: "error",
      content: "手机号码不合法，请重新输入",
    });
    return false;
  }
  return true;
};

const dial = (calleeNumber, callerNumber) => {
  // 获取浏览器麦克风权限,这里不需要错误回调，阿里sdk会监听
  navigator.getUserMedia({ audio: true }, () => {
    // 先检测是否有可用的外呼号码
    dialListNumber().then((res) => {
      if (res.data.length === 0) {
        cloudCodeAPI.showMessage({
          type: "error",
          content: "缺少可用的外呼号码",
        });
        return;
      }
      // 获取被叫号码归属地
      getNumberLocation({ number: calleeNumber }).then((res) => {
        const area =
          res.province && res.city ? `${res.province}-${res.city}` : "";
        store.commit("SET_CALLEE", { num: calleeNumber, area });
        constantAli.API.xbbCall({
          callee: calleeNumber,
          caller: callerNumber,
        });
      });
    });
  });
};
// 优音拨打电话
const yyDial = (calleeNumber) => {
  function callback(...arg) {
    console.log("这里是拨打电话的回调：", arg);
  }
  store.commit("SET_CALLEE", { num: calleeNumber });
  console.log("store.getters.getCallee.num", store.getters.getCallee.num);
  constantYy.API.xbbCall({ userNumber: calleeNumber }, callback); // 优音拨号
  // getNumberLocation({ number: calleeNumber }).then(res => {
  //   const area = (res.province && res.city) ? `${res.province}-${res.city}` : ''
  //   store.commit('SET_CALLEE', { num: calleeNumber, area })
  //   constant.API.xbbCall({ userNumber: calleeNumber }, callback) // 优音拨号
  // })
};

// 外接系统拨打电话
const externalDial = (calleeNumber, callerNumber) => {
  const constant = loadConstant("external-call-center");
  store.commit("SET_CALLEE", { num: calleeNumber });
  console.log("store.getters.getCallee.num", store.getters.getCallee.num);
  constant.API.xbbCall(
    {
      callee: calleeNumber,
      caller: callerNumber,
    },
    (calleeNumber) => {
      console.log("外接系统拨打电话的回调：", calleeNumber);
    }
  );
};

// 快捷拨号
const speedDial = (calleeNumber, callerNumber) => {
  // 话费检测
  checkCall().then((res) => {
    switch (res.code) {
      case 1: // 话费充足
        dial(calleeNumber, callerNumber);
        break;
      case 2: // 话费不足
        window.location.hash = "#/arrears/2";
        break;
      case 3: // 话费即将不足
        window.utils.SS.get("skill_arrears_check")
          ? dial(calleeNumber, callerNumber)
          : (window.location.hash = "#/arrears/3");
        break;
    }
  });
};

// 优音快捷拨号
const speedYyDial = (calleeNumber) => {
  console.log("优音快捷拨号", calleeNumber);
  checkCall().then((res) => {
    switch (res.code) {
      case 1: // 话费充足
        yyDial(calleeNumber);
        break;
      case 2: // 话费不足
        window.location.hash = "#/arrears/2";
        break;
      case 3: // 话费即将不足
        window.utils.SS.get("skill_arrears_check")
          ? yyDial(calleeNumber)
          : (window.location.hash = "#/arrears/3");
        break;
    }
  });
};

// 外接系统快捷拨号
const speedExternalDial = (calleeNumber, callerNumber) => {
  console.log("外接系统快捷拨号", calleeNumber);
  externalDial(calleeNumber, callerNumber);
};

// 保存jobid channelid到vuex
const getMonitorInfo = (callContext) => {
  const { jobId, channelContexts } = callContext;
  const { channelId } = channelContexts.find(
    (channel) => channel.callType === "MONITOR"
  );
  store.commit("SET_MONITOR_INFO", { jobId, channelId, monitoring: true });
};

// 对手机号进行脱敏处理
// calleeNumber:被叫号码 callType：呼入或者呼出  visible:号码查系统权限，是否对号码进行脱敏处理
const dstNumber = (calleeNumber, callType, visible) => {
  // return callType === 'callIn' && callInDst(calleeNumber)
  if (callType === "callIn") {
    return callInDst(calleeNumber);
  } else if (callType === "callOut") {
    return callOutDst(calleeNumber, visible);
  }
};

// 工作台配置 来电显示规则 0:不需要脱敏 1:全部脱敏 2:部分脱敏
const callInDst = (calleeNumber) => {
  switch (window.utils.SS.get("callIdentification")) {
    case "0":
      return calleeNumber;
    case "1":
      return "***********";
    case "2":
      return xbbUtils.dstMobile(calleeNumber);
    default:
      break;
  }
};

// 工作台配置 外呼显示规则 3:不需要脱敏 1:全部脱敏 2:部分脱敏 0：跟随系统权限
const callOutDst = (calleeNumber, visible) => {
  switch (window.utils.SS.get("callDisplay")) {
    case "0":
      return visible ? calleeNumber : xbbUtils.dstMobile(calleeNumber);
    case "1":
      return "***********";
    case "2":
      return xbbUtils.dstMobile(calleeNumber);
    case "3":
      return calleeNumber;
    default:
      break;
  }
};

// 查询指定坐席的状态（/通话中/空闲中等）
const getSeatStatus = (aliUserId) => {
  return new Promise((resolve, reject) => {
    getRealtimeAgentStates({ aliUserId }).then((res) => {
      resolve(res);
    });
  });
};

// 轮询告诉后端前端的登陆状态
function checkYyLogin() {
  let timer = null;
  agentHeartBeat().then((res) => {
    if (timer) clearTimeout(timer);
    if (res.onLine) {
      timer = setTimeout(() => {
        checkYyLogin();
      }, 10000);
    }
  });
}

export default {
  checkSDK,
  recordIconVisible,
  sendMessage,
  getRealNum,
  checkPhone,
  speedDial,
  getMonitorInfo,
  dstNumber,
  getSeatStatus,
  speedYyDial,
  speedExternalDial,
  yyDial,
  externalDial,
  checkYyLogin,
};
