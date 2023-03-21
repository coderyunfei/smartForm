<template>
  <nav-bar></nav-bar>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const toAbout = () => {
  router.push({
    name: "about",
  });
};
</script>
