<template>
  <header>
    <div class="header row no-gutters">
      <div class="header__menu col-4"><i class="fas fa-bars"></i></div>
      <div class="header__logo col-4 text-center">
        <div class="image-container">
          <img src="../../../../assets/images/logo.png" alt="" />
        </div>
      </div>
      <div class="col-4 header__favorites text-right">
        <i class="fas fa-bookmark" @click="onClickFavorites">
          <span class="badge badge-danger">2</span>
        </i>
      </div>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInDown for__notifications"
        leave-active-class="animate__animated animate__fadeOutUp for__notifications"
      >
        <div class="header__droped-favorites-list" v-if="favoritesVisible">
          favorites
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      favoritesVisible: false,
    };
  },
  methods: {
    onClickFavorites() {
      this.favoritesVisible = !this.favoritesVisible;
    },
  },
};
</script>

<style>
</style>