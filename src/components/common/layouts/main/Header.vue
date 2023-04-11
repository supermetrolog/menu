<template>
  <header>
    <div class="header row no-gutters">
      <div class="header__menu col-4">
        <i class="fas fa-bars" @click="onClickBar"></i>
      </div>
      <div class="header__logo col-4 text-center">
        <div class="image-container">
          <img :src="imageSrc" />
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
  computed: {
    ...mapGetters(["FAVORITES"]),
    imageSrc() {
      if (process.env.NODE_ENV == "development") {
        return "http://menu/images/header_logo2.png";
      } else {
        return "https://api.myatatasty.ru/images/header_logo2.png";
      }
    },
  },
  methods: {
    async onClickFavorites() {
      const query = this.$route.query;
      if (this.$route.name == "index") {
        this.windowScrollPositionSave();
        this.$router.push({ name: "Favorites", query });
      } else {
        await this.$router.push({ name: "index", query });
        this.$nextTick(() => {
          this.windowScrollTo();
        });
      }
    },

    async onClickBar() {
      const query = this.$route.query;
      if (this.$route.name == "index") {
        this.windowScrollPositionSave();
        this.$router.push({ name: "Login", query });
      } else {
        await this.$router.push({ name: "index", query });
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