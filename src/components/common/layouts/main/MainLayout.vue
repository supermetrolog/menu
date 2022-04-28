<template>
  <div class="main-layout">
    <Header />
    <Sidebar />
    <section class="content">
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn for__page"
          leave-active-class="animate__animated animate__fadeOut for__page"
        >
          <KeepAlive>
            <component :is="Component" :key="$route.path"></component>
          </KeepAlive>
        </transition>
      </router-view>
    </section>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "MainLayout",
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>
</style>