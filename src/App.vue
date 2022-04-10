<template>
  <div>
    <notifications position="bottom right" group="app" />
    <Loader v-if="loader" />
    <component :is="layout" v-else> </component>
  </div>
</template>

<script>
import EmptyLayout from "./components/common/layouts/empty/EmptyLayout";
import MainLayout from "./components/common/layouts/main/MainLayout";
import HeaderLayout from "./components/common/layouts/header/HeaderLayout";
import SidebarLayout from "./components/common/layouts/sidebar/SidebarLayout";
import { mapActions } from "vuex";

export default {
  components: {
    MainLayout,
    EmptyLayout,
    HeaderLayout,
    SidebarLayout,
  },
  data() {
    return {
      loader: false,
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "Layout";
    },
  },
  methods: {
    ...mapActions(["INIT", "FETCH_CATEGORIES", "FETCH_DATA"]),
  },
  async mounted() {
    document.title = "Мята меню";
    this.loader = true;
    this.FETCH_DATA();
    await this.FETCH_CATEGORIES();
    this.loader = false;
    this.$store.dispatch("INIT");
  },
};
</script>