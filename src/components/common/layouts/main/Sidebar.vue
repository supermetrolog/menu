<template>
  <section class="sidebar">
    <ul class="categories">
      <li
        v-for="category of DATA"
        :key="category.id"
        :title="category.title"
        @click="onClickCategory(category)"
        :class="{ active: $route.query.category == category.id }"
      >
        <div class="categories__image">
          <div class="image-container">
            <img :src="getImageSrc(category)" :alt="category.title" />
          </div>
        </div>

        <div class="categories__title">
          <p>{{ category.title }}</p>
        </div>
      </li>
    </ul>
    <div class="sub-category-list">
      <div
        class="current-sub-category"
        v-if="currentSubCategory"
        @click="onClickSubCategoryList"
      >
        <p>
          {{ currentSubCategory.title }}
          <i class="fas fa-angle-down" v-if="!subCategoryListVisible"></i>
          <i class="fas fa-angle-up" v-else></i>
        </p>
      </div>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInRight for__modal"
        leave-active-class="animate__animated animate__fadeOutRight for__modal"
      >
        <div class="sub-category-list-container" v-if="subCategoryListVisible">
          <div class="sub-category-list-items">
            <ProductsCategory
              v-for="category of DATA"
              :key="category.id"
              :category="category"
              :titleVisible="true"
              :class="{ active: category.id == currentSubCategory.category_id }"
              @clickTitle="onClickCategory(category)"
            >
              <ProductsSubCategory
                v-for="subCategory of category.subCategories"
                :key="subCategory.id"
                :subCategory="subCategory"
                :class="{ active: subCategory.id == currentSubCategory.id }"
                @clickTitle="onClickSubCategory(subCategory)"
              >
              </ProductsSubCategory>
            </ProductsCategory>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";
import { mapActions, mapGetters } from "vuex";
import ProductsCategory from "@/components/products/ProductsCategory.vue";
import ProductsSubCategory from "@/components/products/ProductsSubCategory.vue";
export default {
  name: "Sidebar",
  components: {
    ProductsSubCategory,
    ProductsCategory,
  },
  data() {
    return {
      subCategoryListVisible: false,
    };
  },
  computed: {
    ...mapGetters(["CATEGORIES", "DATA"]),
    imageSrc() {
      if (process.env.NODE_ENV == "development") {
        return "http://menu/images/kitchen.png";
      } else {
        return "https://myatatasty.store/images/kitchen.png";
      }
    },
    currentSubCategory() {
      if (!this.DATA || !this.DATA.length) {
        return null;
      }
      let currentSubCategory = null;
      this.DATA.forEach((category) => {
        category.subCategories.forEach((sub_category) => {
          if (sub_category.id == this.$route.query.sub_category) {
            currentSubCategory = sub_category;
          }
        });
      });
      return currentSubCategory;
    },
  },
  methods: {
    ...mapActions(["SET_SCROLLING"]),
    getImageSrc(category) {
      let baseUrl = "";
      if (process.env.NODE_ENV == "development") {
        baseUrl = "http://menu/uploads/";
      } else {
        baseUrl = "https://myatatasty.store/uploads/";
      }
      if (category.image) {
        return baseUrl + category.image;
      }

      if (process.env.NODE_ENV == "development") {
        return "http://menu/images/icon.png";
      } else {
        return "https://myatatasty.store/images/icon.png";
      }
    },
    onClickSubCategory(sub_category) {
      this.subCategoryListVisible = false;
      const query = {
        ...this.$route.query,
        sub_category: sub_category.id,
        category: sub_category.category_id,
      };
      this.$router.replace({
        query,
      });
      this.scrollToSubCategory(sub_category);
    },
    onClickCategory(category) {
      this.subCategoryListVisible = false;
      const query = { ...this.$route.query, category: category.id };
      if (category.subCategories.length) {
        query.sub_category = category.subCategories[0].id;
      }
      this.$router.replace({
        query,
      });
      this.scrollToCategory(category);
    },
    scrollToSubCategory(sub_category) {
      const SubCategories = document.querySelectorAll(
        '.products__sub_category[data-sub-category-sub="' +
          sub_category.id +
          '"]'
      );
      if (!SubCategories.length) return;
      // this.scrollTo(SubCategories[0]);
      this.scrollWindow(SubCategories[0]);
      this.SET_SCROLLING();
    },
    scrollToCategory(category) {
      const SubCategories = document.querySelectorAll(
        '.products__sub_category[data-category-sub="' + category.id + '"]'
      );
      if (!SubCategories.length) return;
      // this.scrollTo(SubCategories[0]);
      this.scrollWindow(SubCategories[0]);
      this.SET_SCROLLING();
    },

    scrollTo(el) {
      scrollIntoView(el, {
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    scrollWindow(el) {
      let topOffset = -65;
      let top = el.getBoundingClientRect().top + topOffset;
      scrollBy(window, {
        top,
        left: 0,
        behavior: "smooth",
      });
    },
    onClickSubCategoryList() {
      console.log("click");
      this.subCategoryListVisible = !this.subCategoryListVisible;
    },
  },
};
</script>

<style>
</style>