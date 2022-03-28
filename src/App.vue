<template>
  <div>
    <notifications position="bottom right" group="app" />
    <component :is="layout"> </component>
  </div>
</template>

<script>
import EmptyLayout from "./components/common/layouts/empty/EmptyLayout";
import MainLayout from "./components/common/layouts/main/MainLayout";

export default {
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "Layout";
    },
  },
};
</script>