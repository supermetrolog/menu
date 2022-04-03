<template>
  <div class="main-layout header-layout">
    <Header />
    <section class="content">
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn for__page"
          leave-active-class="animate__animated animate__fadeOut for__page"
        >
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </section>
  </div>
</template>

<script>
import Header from "../main/Header.vue";
export default {
  name: "HeaderLayout",
  components: {
    Header,
  },
};
</script>

<style>
</style>