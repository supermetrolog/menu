<template>
  <div class="header__droped-favorites-list">
    <div>
      <div class="title">
        <p>Избаранное</p>
      </div>
      <div class="products">
        <ProductsItem
          v-for="product of FAVORITES"
          :key="product.id"
          :product="product"
          selected
        />
        <ProductsItem
          v-for="product of FAVORITES"
          :key="product.id"
          :product="product"
          selected
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsItem from "@/components/products/ProductsItem";
import { BodyScrollLocked } from "@/components/mixins.js";
export default {
  mixins: [BodyScrollLocked],
  name: "FavoritesList",
  components: {
    ProductsItem,
  },

  computed: {
    ...mapGetters(["FAVORITES"]),
  },
  mounted() {
    this.bodyScrollLocked();
  },
  beforeUnmount() {
    this.bodyScrollUnLocked();
  },
};
</script>

<style>
</style>