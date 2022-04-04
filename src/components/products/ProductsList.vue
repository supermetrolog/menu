<template>
  <div class="products" id="observable-root">
    <ProductsSubCategory
      v-for="subCategory of SUB_CATEGORIES"
      :key="subCategory.id"
      :title="subCategory.title"
      :observer="observer"
      :data-category="subCategory.category"
    >
      <ProductsItem
        v-for="product of subCategory.products"
        :key="product.id"
        :product="product"
      />
    </ProductsSubCategory>
  </div>
</template>

<script>
import ProductsItem from "./ProductsItem.vue";
import ProductsSubCategory from "./ProductsSubCategory.vue";
import { mapGetters } from "vuex";
import { Menu } from "@/const";
export default {
  name: "ProductsList",
  components: {
    ProductsItem,
    ProductsSubCategory,
  },
  data() {
    return {
      observer: null,
      menu: Menu,
    };
  },
  computed: {
    ...mapGetters(["SUB_CATEGORIES"]),
  },
  methods: {
    observerCallback(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          console.error("fuck");
        } else {
          console.warn("fuck");
        }
        if (!isIntersecting) {
          return;
        }

        setTimeout(() => {
          const category = target.getAttribute("data-category");
          const CategoryItem = this.menu.find((item) => item.id == category);
          const query = { ...this.$route.query, category: CategoryItem.name };

          this.$router.push({ query });
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
    console.log("unmount");
    this.observer.disconnect();
  },
};
</script>

<style>
</style>