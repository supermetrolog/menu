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
          <span class="badge badge-danger" v-if="FAVORITES.length">{{
            FAVORITES.length
          }}</span>
        </i>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { WindowScrollManager } from "@/components/mixins.js";
export default {
  mixins: [WindowScrollManager],
  name: "Header",
  data() {
    return {
      favoritesVisible: false,
    };
  },
  computed: {
    ...mapGetters(["FAVORITES"]),
  },
  methods: {
    async onClickFavorites() {
      if (this.$route.name == "index") {
        this.windowScrollPositionSave();
        this.$router.push({ name: "Favorites" });
      } else {
        await this.$router.push({ name: "index" });
        this.$nextTick(() => {
          this.windowScrollTo();
        });
      }
    },
  },
};
</script>

<style>
</style>