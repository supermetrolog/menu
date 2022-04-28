<template>
  <div class="empty-layout">
    <section class="empty-layout__content">
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
export default {
  name: "EmptyLayout",
};
</script>

<style>
</style>