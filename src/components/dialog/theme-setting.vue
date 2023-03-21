<template>
  <div class="theme-setting" v-click-outside="onClickOutside">
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
      <div class="resetTheme">
        <i class="web-iconfont web-icon-zhongzuo"></i>
        <span>恢复默认主题</span>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const radio1 = ref("1");

const onClickOutside = () => {
  console.log("点击了外部 DOM");
};
</script>
<style>
.theme-setting .el-radio {
  width: 100px;
  margin-right: 40px;
}
.theme-setting .el-upload--picture-card {
  width: 80px;
  height: 40px;
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
      }
      .use-img {
        background-color: $neutral-color-1;
        border: 2px dashed $neutral-color-2;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        i {
          font-size: 18px;
          color: $neutral-color-4;
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
            border-radius: 8px;
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
            width: 80px;
            height: 40px;
            background-color: $neutral-color-3;
            margin: 12px 82px 12px 0;
            background-color: $neutral-color-1;
            border: 2px dashed $neutral-color-3;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            i {
              font-size: 18px;
              color: $neutral-color-4;
            }
          }
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
    i {
      font-size: 20px;
    }
  }
}
</style>
