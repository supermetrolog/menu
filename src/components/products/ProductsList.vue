<template>
  <div class="products" id="observable-root">
    <Loader v-if="loader" />
    <KeepAlive>
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
          :isAdmin="isAdmin"
          :data-category-sub="subCategory.category_id"
          :data-sub-category-sub="subCategory.id"
          @deleteSubCategory="deleteSubCategory"
        >
          <ProductsItem
            v-for="product of subCategory.products"
            :key="product.id"
            :product="product"
            :isAdmin="isAdmin"
            :data-sub-category="subCategory.id"
            :data-category="category.id"
            :observer="observerSubCategory"
            :observerCategory="observer"
            @deleteProduct="deleteProduct"
          />
        </ProductsSubCategory>
      </ProductsCategory>
    </KeepAlive>
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
      observerSubCategory: null,
      loader: false,
      IntersectionBufferSubCategory: [],
      IntersectionBufferCategory: [],
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
          const category = target.getAttribute("data-category");
          this.IntersectionBufferCategory =
            this.IntersectionBufferCategory.filter((item) => item != category);
          return;
        }

        const category = target.getAttribute("data-category");
        const query = { ...this.$route.query, category };
        this.IntersectionBufferCategory =
          this.IntersectionBufferCategory.filter((item) => item != category);
        this.IntersectionBufferCategory.push(category);
        if (
          !this.$route.query.category ||
          (this.$route.query.category != category && !this.IS_SCROLLING_NOW)
        ) {
          if (
            this.IntersectionBufferCategory.length &&
            this.IntersectionBufferCategory[0]
          ) {
            query.category = this.IntersectionBufferCategory[0];
          }
          // this.$router.push({ query });
        }
      });
    },
    observerCallbackSubCategory(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          const sub_category = target.getAttribute("data-sub-category");
          this.IntersectionBufferSubCategory =
            this.IntersectionBufferSubCategory.filter(
              (item) => item != sub_category
            );
          return;
        }

        const sub_category = target.getAttribute("data-sub-category");
        const query = { ...this.$route.query, sub_category };
        this.IntersectionBufferSubCategory =
          this.IntersectionBufferSubCategory.filter(
            (item) => item != sub_category
          );
        this.IntersectionBufferSubCategory.push(sub_category);
        if (
          (!this.$route.query.sub_category ||
            this.$route.query.sub_category != sub_category) &&
          !this.IS_SCROLLING_NOW
        ) {
          if (this.IntersectionBufferSubCategory.length) {
            query.sub_category = this.IntersectionBufferSubCategory[0];
          }
          const category = this.DATA.find((category) =>
            category.subCategories.find(
              (subCategory) => subCategory.id == query.sub_category
            )
          );
          query.category = category.id;
          console.log("change", this.IS_SCROLLING_NOW);
          this.$router.replace({ query });
        }
      });
    },
    async deleteProduct(product) {
      const isApprove = confirm(
        `Вы действительно хотите удалить продукт: "${product.title}"`
      );
      if (!isApprove) return;
      this.loader = true;
      await api.categories.deleteProduct(product.id);
      await this.FETCH_DATA(true);
      this.loader = false;
    },
    async deleteCategory(category) {
      const isApprove = confirm(
        `Вы действительно хотите удалить категорию: "${category.title}"`
      );
      if (!isApprove) return;
      this.loader = true;
      await api.categories.deleteCategory(category.id);
      await this.FETCH_CATEGORIES(true);
      await this.FETCH_DATA(true);
      this.loader = false;
    },
    async deleteSubCategory(subCategory) {
      const isApprove = confirm(
        `Вы действительно хотите удалить подкатегорию: "${subCategory.title}"`
      );
      if (!isApprove) return;
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
      threshold: 1,
    });
    this.observerSubCategory = new IntersectionObserver(
      this.observerCallbackSubCategory,
      {
        root: this.$el,
        threshold: 1,
      }
    );
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style>
</style>