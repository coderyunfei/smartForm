<!-- 通用弹窗 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    @close="cancel"
  >
    <slot name="dialogBody"></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button plain @click="cancel" v-if="showFooter">取 消</el-button>
        <el-button plain type="primary" @click="confirm" v-if="showFooter"
          >确 定</el-button
        >
      </div>
      <slot name="defineFooter"></slot>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
// 注册emit
const emit = defineEmits(["update:visible", "confirmCb"]);
// setup语法糖里面 defineEmits,defineProps无需导入，直接使用
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "30%",
  },
  title: {
    type: String,
    default: "标题",
  },
  // 是否显示底部，因为会有自定义的底部，并不是都是那种取消和确定
  showFooter: {
    type: Boolean,
    default: true,
  },
});
const dialogVisible = ref(props.visible);
// 监听 visible 改变
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);
// 点击取消、关闭按钮、
const cancel = () => {
  emit("update:visible", false);
};
// 点击确定按钮的回调方法
const confirm = () => {
  emit("confirmCb");
};
</script>
<style lang="scss" scoped></style>
