/*
 * @Description:云扣接口
 */
import xbb from "xbb-sdk";
import { ElMessage, ElMessageBox } from "element-plus";
// import storage from './storage'
// import common from './common'

// const LS = storage.LS

// 判断是否通过云扣调用
function cloudCodeEnv() {
  return window.location.ancestorOrigins.length > 0;
}

// elementUi message
function showMessage({ type, content }) {
  if (cloudCodeEnv()) {
    xbb.useComponent({
      action: "showMessage",
      data: { type, content, time: 3000 },
    });
  } else {
    ElMessage({ type, message: content });
  }
}

// 设置标题
function setTitle(title) {
  if (!cloudCodeEnv()) return;
  xbb.setTitle({ title });
}

// 接口响应拦截器提示框
const messageBox = function (params = {}) {
  const _duration = params.duration || 2000;
  params.duration = _duration;
  params.showClose = params.showClose === undefined ? true : params.showClose;
  params.type = params.type || "success";
  params.message = params.message || "保存成功";
  showMessage({ type: params.type, content: params.message });
};

// 确认提示框
const confirmBox = ({
  option = {},
  title = null,
  content = undefined,
  confirm = () => {},
  cancel = () => {},
}) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      type: "warning",
      ...option,
    })
      .then(() => {
        confirm();
        resolve(true);
      })
      .catch(() => {
        cancel();
      });
  });
};

export default {
  cloudCodeEnv,
  showMessage,
  setTitle,
  messageBox,
  confirmBox,
};
