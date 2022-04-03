<template>
  <div>
    <notifications position="bottom right" group="app" />
    <component :is="layout"> </component>
  </div>
</template>

<script>
import EmptyLayout from "./components/common/layouts/empty/EmptyLayout";
import MainLayout from "./components/common/layouts/main/MainLayout";
import HeaderLayout from "./components/common/layouts/header/HeaderLayout";

export default {
  components: {
    MainLayout,
    EmptyLayout,
    HeaderLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "Layout";
    },
  },
};
</script>