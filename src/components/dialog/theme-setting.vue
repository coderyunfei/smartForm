<template>
  <div
    class="theme-setting"
    v-click-outside="onClickOutside"
    v-show="themeDialog"
  >
    <ul>
      <li>
        <div class="setting-title">背景</div>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">用颜色</el-radio>
          <el-radio label="2" size="large">用图片</el-radio>
        </el-radio-group>
        <div class="setting-choose-item">
          <div class="use-bg"></div>
          <div class="use-img">
            <i class="web-iconfont web-icon-plus"></i>
          </div>
        </div>
        <div class="gap-line"></div>
      </li>
      <li>
        <div class="setting-title">头图</div>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">用头图</el-radio>
          <el-radio label="2" size="large">不要头图</el-radio>
        </el-radio-group>
        <div class="setting-choose-item">
          <div class="use-img">
            <i class="web-iconfont web-icon-plus"></i>
          </div>
        </div>
        <div class="gap-line"></div>
      </li>
      <li>
        <div class="setting-title">
          <span>内容背景色</span>
          <el-tooltip content="内容背景色" placement="top">
            <i class="web-iconfont web-icon-question-circle"></i>
          </el-tooltip>
        </div>
        <div class="setting-choose-item">
          <div class="use-bg"></div>
        </div>
        <div class="gap-line"></div>
      </li>
      <li>
        <div class="setting-title">
          <span>组件相关色</span>
          <el-tooltip content="组件相关色" placement="top">
            <i class="web-iconfont web-icon-question-circle"></i>
          </el-tooltip>
        </div>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">自定义</el-radio>
          <el-radio label="2" size="large">默认</el-radio>
        </el-radio-group>
        <div class="selectBlock">
          <ul>
            <li>
              <span>标题色</span>
              <div class="use-bg"></div>
            </li>
            <li>
              <span>副标题色</span>
              <div class="use-bg"></div>
            </li>
          </ul>
          <ul>
            <li>
              <span>组件填充色</span>
              <div class="use-bg"></div>
            </li>
            <li>
              <span>组件边框色</span>
              <div class="use-bg"></div>
            </li>
            <li>
              <span>组件内文字色</span>
              <div class="use-bg"></div>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div class="setting-title">
          <span>组件布局</span>
          <el-tooltip content="组件布局" placement="top">
            <i class="web-iconfont web-icon-question-circle"></i>
          </el-tooltip>
        </div>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">上下布局</el-radio>
          <el-radio label="2" size="large">左右布局</el-radio>
        </el-radio-group>
      </li>
      <li>
        <div class="setting-title">LOGO展示</div>
        <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="1" size="large">默认</el-radio>
          <el-radio label="2" size="large">企业专属</el-radio>
        </el-radio-group>
        <div class="logo-setting">
          <div class="logo-tip">
            <span>此功能旗舰版限时免费</span>
            <a href="">功能说明</a>
          </div>
          <div class="logo-choose">
            <div class="logo-choose-item">
              <span>网页图标</span>
              <div class="use-img">
                <i class="web-iconfont web-icon-plus"></i>
              </div>
            </div>
            <div class="logo-choose-item">
              <span>品牌LOGO</span>
              <div class="use-img">
                <i class="web-iconfont web-icon-plus"></i>
              </div>
            </div>
          </div>
          <div class="logo-guide-content">
            <span>底部引导文案</span>
            <el-input placeholder="请输入内容"></el-input>
          </div>
          <div class="logo-guide-content">
            <span>点击后跳转</span>
            <el-input placeholder="请输入链接地址"></el-input>
          </div>
        </div>
      </li>
      <div class="resetTheme" @click="openResetDefaultTheme">
        <i class="web-iconfont web-icon-zhongzuo"></i>
        <span>恢复默认主题</span>
      </div>
    </ul>
    <!-- 恢复默认主题弹窗 -->
    <common-dialog
      v-model:visible="resetDialog"
      title="恢复默认主题"
      width="420px"
      @confirmCb="dialogConfirm"
    >
      <template #dialogBody>
        <div class="content">
          <i class="cancel_icon el-icon-warning"></i>
          <span>确定恢复吗？</span>
        </div>
        <div class="sub-content">
          背景色、文本与组件色彩等主题相关设置都将恢复到初始状态
        </div>
      </template>
    </common-dialog>

    <!-- 专属logo弹窗 -->
    <common-dialog
      v-model:visible="logoDialog"
      title="企业专属LOGO功能说明"
      width="900px"
      :showFooter="showFooter"
      @confirmCb="dialogConfirm"
    >
      <template #dialogBody>
        <div class="logoDesc">
          <i class="web-iconfont web-icon-crown-fill"></i>
          <span
            >企业专属LOGO功能，可设置在网页顶部、表单底部展示企业LOGO及文字，突显企业品牌</span
          >
        </div>
        <img src="" alt="" />
      </template>
      <template #defineFooter>
        <div class="dialog-footer logo-footer">
          <div class="footer-left">
            旗舰版限时免费，可升级套餐或单独开通使用
          </div>
          <div class="footer-right">
            <span class="oldprice">原价 499元/年</span>
            <span class="nowprice"><em>180</em>元/年</span>
            <el-button type="primary">申请开通</el-button>
          </div>
        </div>
      </template>
    </common-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

import commonDialog from "./common-dialog.vue";
const radio1 = ref("1");
const showFooter = ref(false);
const logoDialog = ref(true);
const resetDialog = ref(false);

const emit = defineEmits(["update:themeDialog"]);
const props = defineProps({
  themeDialog: {
    type: Boolean,
    default: false,
  },
});

// //点击了外部dom，关闭主题设置弹窗
const onClickOutside = () => {
  console.log("222");
  emit("update:themeDialog", false);
};

// 打开恢复默认主题弹窗
const openResetDefaultTheme = () => {
  resetDialog.value = true;
};
// 恢复默认主题弹窗点击确定
const dialogConfirm = () => {
  console.log("点击确定");
  resetDialog.value = false;
};
</script>
<style lang="scss">
.theme-setting {
  .el-radio {
    width: 100px;
    margin-right: 40px;
  }
  .el-upload--picture-card {
    width: 80px;
    height: 40px;
  }
}
</style>
<style lang="scss" scoped>
.theme-setting {
  position: absolute;
  right: 20px;
  top: 52px;
  width: 400px;
  height: 700px;
  max-height: 700px;
  overflow-y: scroll;
  background-color: $base-white;
  border-radius: 12px;
  box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08),
    0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
  padding: 24px;
  li {
    margin-bottom: 20px;
    .setting-title {
      font-size: 14px;
      color: $text-plain;
      margin-bottom: 20px;
      font-weight: bold;
      span {
        &:first-child {
          font-weight: bold;
        }
      }
      i {
        margin-left: 6px;
        color: $neutral-color-4;
        cursor: pointer;
      }
    }
    .setting-choose-item {
      display: flex;
      margin-top: 12px;
      margin-bottom: 20px;
      .use-bg,
      .use-img {
        width: 80px;
        height: 40px;
        background-color: $neutral-color-3;
        margin-right: 60px;
        border-radius: 4px;
        &:hover {
          border: 1px dashed $brand-base-color-6;
          cursor: pointer;
        }
      }
      .use-img {
        cursor: pointer;
        background-color: $neutral-color-1;
        border: 1px dashed $neutral-color-2;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        i {
          font-size: 18px;
          color: $neutral-color-4;
        }
        &:hover {
          i {
            font-size: 18px;
            color: $brand-base-color-6;
          }
        }
      }
    }
    .gap-line {
      width: 100%;
      height: 1px;
      background-color: $neutral-color-2;
    }
    .selectBlock {
      width: 100%;
      height: 184px;
      border-radius: 12px;
      background-color: $bg-table;
      padding: 16px;
      margin-top: 12px;
      ul {
        display: flex;
        li {
          display: flex;
          flex-direction: column;
          .use-bg {
            width: 80px;
            height: 40px;
            background-color: $neutral-color-3;
            margin-right: 36px;
            border-radius: 4px;
            &:hover {
              border: 1px dashed $brand-base-color-6;
              cursor: pointer;
            }
          }
          span {
            margin-bottom: 8px;
          }
        }
      }
    }
    .logo-setting {
      width: 100%;
      height: 312px;
      border-radius: 12px;
      background-color: $bg-table;
      padding: 16px;
      margin-top: 12px;
      .logo-tip {
        width: 100%;
        height: 32px;
        border-radius: 8px;
        background-color: $base-white;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: $text-auxiliary;
        padding-left: 16px;
        margin-bottom: 16px;
        a {
          margin-left: 12px;
          color: $brand-base-color-6;
          text-decoration: underline;
        }
      }

      .logo-choose {
        display: flex;
        .logo-choose-item {
          display: flex;
          flex-direction: column;
          span {
            font-size: 14px;
            color: $text-plain;
          }
          .use-img {
            cursor: pointer;
            width: 80px;
            height: 40px;
            background-color: $neutral-color-3;
            margin: 12px 82px 16px 0;
            background-color: $neutral-color-1;
            border: 1px dashed $neutral-color-3;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            i {
              font-size: 18px;
              color: $neutral-color-4;
            }
            &:hover {
              border: 1px dashed $brand-base-color-6;
              i {
                font-size: 18px;
                color: $brand-base-color-6;
              }
            }
          }
        }
      }
      .logo-guide-content {
        margin-bottom: 16px;
        span {
          color: $text-plain;
          display: inline-block;
          margin-bottom: 12px;
        }
      }
    }
  }
  .resetTheme {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: $base-white;
    border: 1px solid $neutral-color-3;
    font-size: 14px;
    color: $text-plain;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    &:hover {
      color: $brand-base-color-6;
    }
  }

  .content {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: $brand-color-4;
      margin-right: 18px;
    }
    span {
      font-size: 14px;
      color: $text-main;
    }
  }
  .sub-content {
    padding-left: 42px;
    font-size: 14px;
    color: $error-base-color-6;
  }
  .logo-footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .footer-left {
      font-size: 14px;
      color: $text-plain;
    }
    .footer-right {
      display: flex;
      align-items: center;
      .oldprice {
        font-size: 12px;
        text-decoration: line-through;
        color: $text-auxiliary;
        margin-right: 8px;
      }
      .nowprice {
        font-size: 12px;
        color: $brand-base-color-6;
        margin-right: 32px;
        em {
          font-style: normal;
          font-size: 18px;
        }
      }
    }
  }

  .logoDesc {
    width: 100%;
    height: 40px;
    background-color: $brand-color-1;
    display: flex;
    align-items: center;
    color: $brand-base-color-6;
    padding: 0 18px;
    margin-bottom: 20px;
    span {
      margin-left: 8px;
    }
  }
}
</style>
