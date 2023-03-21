<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <i class="iconfont icon-left"></i>
      <span>未命名智能表单</span>
    </div>
    <div class="nav-step">
      <div class="step">
        <span class="step-num" :class="{ activeStep: activeStep === 1 }"
          >1</span
        >
        <span class="step-content" :class="{ activeStep: activeStep === 1 }"
          >表单设计</span
        >
        <i class="iconfont icon-right stepArrow"></i>
      </div>
      <div class="step">
        <span class="step-num" :class="{ activeStep: activeStep === 2 }"
          >2</span
        >
        <span class="step-content" :class="{ activeStep: activeStep === 2 }"
          >表单设置</span
        >
        <i class="iconfont icon-right stepArrow"></i>
      </div>
      <div class="step">
        <span class="step-num" :class="{ activeStep: activeStep === 3 }"
          >3</span
        >
        <span class="step-content" :class="{ activeStep: activeStep === 3 }"
          >完成</span
        >
      </div>
    </div>
    <div class="nav-right">
      <i class="web-iconfont web-icon-chexiao1 noEdit"></i>
      <i class="web-iconfont web-icon-zhongzuo"></i>
      <i
        class="web-iconfont web-icon-bg-colors exludeClass"
        @click="openThemeDialog"
      ></i>
      <i class="web-iconfont web-icon-eye"></i>
      <div class="operate-btn">
        <el-button>仅保存</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </div>

    <!-- 主题弹窗 -->
    <theme-setting v-model:themeDialog="themeDialog"></theme-setting>
  </div>
</template>
<script setup>
import { ref } from "vue";
import themeSetting from "@/components/dialog/theme-setting.vue";

const activeStep = ref(1);
const themeDialog = ref(false);

// 点击下一步
const next = () => {
  if (activeStep.value++ > 2) activeStep.value = 1;
};
//打开设置主题弹窗
const openThemeDialog = () => {
  themeDialog.value = true;
};
</script>

<style lang="scss" scoped>
.nav-wrap {
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  background-color: $base-white;
  padding: 16px 20px;
  justify-content: space-between;
  .nav-left {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
    }
    span {
      font-size: 18px;
      color: $text-plain;
      margin-left: 4px;
    }
  }
  .nav-step {
    width: 500px;
    display: flex;
    align-items: center;
    .step {
      display: flex;
      align-items: center;
      margin-right: 12px;
      .step-num {
        color: $text-plain;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: $neutral-color-1;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        font-weight: bold;
        &.activeStep {
          background-color: $brand-color-1;
          color: $brand-base-color-6;
        }
      }
      .step-content {
        font-size: 14px;
        margin-right: 12px;
        font-weight: bold;
        color: $text-plain;
        &.activeStep {
          color: $brand-base-color-6;
        }
      }
      i {
        font-size: 16px;
        color: $neutral-color-4;
      }
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: $brand-base-color-6;
      }
      &.noEdit {
        @include noEdit;
      }
    }
  }
}
</style>
