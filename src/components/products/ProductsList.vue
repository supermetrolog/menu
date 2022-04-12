<template>
  <div class="products" id="observable-root">
    <Loader v-if="loader" />
    <ProductsCategory
      v-for="category of DATA"
      :key="category.id"
      :category="category"
      :isAdmin="isAdmin"
      @deleteCategory="deleteCategory"
    >
      <ProductsSubCategory
        v-for="subCategory of category.subCategories"
        :key="subCategory.id"
        :subCategory="subCategory"
        :observer="observer"
        :data-category="subCategory.category_id"
        :isAdmin="isAdmin"
        @deleteSubCategory="deleteSubCategory"
      >
        <ProductsItem
          v-for="product of subCategory.products"
          :key="product.id"
          :product="product"
          :isAdmin="isAdmin"
          @deleteProduct="deleteProduct"
        />
      </ProductsSubCategory>
    </ProductsCategory>
  </div>
</template>

<script>
import ProductsItem from "./ProductsItem.vue";
import ProductsSubCategory from "./ProductsSubCategory.vue";
import ProductsCategory from "./ProductsCategory.vue";
import { mapActions, mapGetters } from "vuex";
import api from "@/api/api";
export default {
  name: "ProductsList",
  components: {
    ProductsItem,
    ProductsSubCategory,
    ProductsCategory,
  },
  data() {
    return {
      observer: null,
      loader: false,
    };
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["SUB_CATEGORIES", "IS_SCROLLING_NOW", "DATA"]),
  },
  methods: {
    ...mapActions(["FETCH_DATA", "FETCH_CATEGORIES"]),
    observerCallback(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          console.error("нет");
          return;
        }
        console.warn("пересекает");

        setTimeout(() => {
          const category = target.getAttribute("data-category");
          const query = { ...this.$route.query, category };
          if (
            !this.$route.query.category ||
            (this.$route.query.category != category && !this.IS_SCROLLING_NOW)
          ) {
            console.warn("push");
            this.$router.push({ query });
          }
        }, 100);
      });
    },

    async deleteProduct(product) {
      this.loader = true;
      await api.categories.deleteProduct(product.id);
      await this.FETCH_DATA(true);
      this.loader = false;
    },
    async deleteCategory(category) {
      this.loader = true;
      await api.categories.deleteCategory(category.id);
      await this.FETCH_CATEGORIES(true);
      await this.FETCH_DATA(true);
      this.loader = false;
    },
    async deleteSubCategory(subCategory) {
      this.loader = true;
      await api.categories.deleteSubCategory(subCategory.id);
      await this.FETCH_CATEGORIES(true);
      await this.FETCH_DATA(true);
      this.loader = false;
    },
  },
  created() {
    this.observer = new IntersectionObserver(this.observerCallback, {
      root: this.$el,
      threshold: 0.5,
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style>
</style>