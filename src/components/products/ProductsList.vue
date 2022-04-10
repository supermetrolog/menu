<template>
  <div class="products" id="observable-root">
    <ProductsCategory
      v-for="category of DATA"
      :key="category.id"
      :title="category.title"
    >
      <ProductsSubCategory
        v-for="subCategory of category.subCategories"
        :key="subCategory.id"
        :title="subCategory.title"
        :observer="observer"
        :data-category="subCategory.category_id"
      >
        <ProductsItem
          v-for="product of subCategory.products"
          :key="product.id"
          :product="product"
        />
      </ProductsSubCategory>
    </ProductsCategory>
  </div>
</template>

<script>
import ProductsItem from "./ProductsItem.vue";
import ProductsSubCategory from "./ProductsSubCategory.vue";
import ProductsCategory from "./ProductsCategory.vue";
import { mapGetters } from "vuex";
import { Menu } from "@/const";
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
      menu: Menu,
    };
  },
  computed: {
    ...mapGetters(["SUB_CATEGORIES", "IS_SCROLLING_NOW", "DATA"]),
  },
  methods: {
    observerCallback(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          console.error("нет");
          return;
        }
        console.warn("пересекает");

        setTimeout(() => {
          const category = target.getAttribute("data-category");
          const CategoryItem = this.menu.find((item) => item.id == category);
          const query = { ...this.$route.query, category: CategoryItem.name };
          if (
            !this.$route.query.category ||
            (this.$route.query.category != CategoryItem.name &&
              !this.IS_SCROLLING_NOW)
          ) {
            console.warn("push");
            this.$router.push({ query });
          }
        }, 100);
      });
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