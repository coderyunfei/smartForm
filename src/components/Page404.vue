<template>404 not found</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>

<style lang="scss" scoped>
a {
  color: $color;
}
</style>
