<template>
  <div class="products">
    <ProductsCategory
      v-for="category of CATEGORIES"
      :key="category.id"
      :title="category.title"
    >
      <ProductsSubCategory
        v-for="subCategory of category.subCategories"
        :key="subCategory.id"
        :title="subCategory.title"
      >
        <ProductsItem
          v-for="product of subCategory.products"
          :key="product.id"
          :product="product"
        />
        <!-- <ProductsItem
          v-for="product of subCategory.products"
          :key="product.id"
          :product="product"
        /> -->
      </ProductsSubCategory>
    </ProductsCategory>
  </div>
</template>

<script>
import ProductsItem from "./ProductsItem.vue";
import ProductsCategory from "./ProductsCategory.vue";
import ProductsSubCategory from "./ProductsSubCategory.vue";
import { mapGetters } from "vuex";
export default {
  name: "ProductsList",
  components: {
    ProductsItem,
    ProductsCategory,
    ProductsSubCategory,
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
  },
};
</script>

<style>
</style>