<template>
  <div class="favorites">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsItem from "@/components/products/ProductsItem";
export default {
  name: "Favorites",
  components: {
    ProductsItem,
  },
  computed: {
    ...mapGetters(["FAVORITES"]),
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>