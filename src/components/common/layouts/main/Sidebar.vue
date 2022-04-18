<template>
  <section class="sidebar">
    <ul class="categories">
      <li
        v-for="category of CATEGORIES"
        :key="category.id"
        :title="category.title"
        @click="onClickCategory(category)"
        :class="{ active: $route.query.category == category.id }"
      >
        <div class="categories__image">
          <div class="image-container">
            <img :src="imageSrc" :alt="category.title" />
          </div>
        </div>

        <div class="categories__title">
          <p>{{ category.title }}</p>
        </div>
      </li>
    </ul>
    <div class="sub-category-list">
      <div class="current-sub-category" v-if="currentSubCategory">
        <p>{{ currentSubCategory.title }}<i class="fas fa-angle-down"></i></p>
      </div>
    </div>
  </section>
</template>

<script>
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["CATEGORIES", "DATA"]),
    imageSrc() {
      if (process.env.NODE_ENV == "development") {
        return "http://menu/images/icon.png";
      } else {
        return "https://myatatasty.store/images/icon.png";
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
    onClickCategory(category) {
      let query = {
        category: category.id,
      };
      this.$router.replace({
        query,
      });
      this.scrollToSubCategory(category);
    },

    scrollToSubCategory(category) {
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
  },
};
</script>

<style>
</style>