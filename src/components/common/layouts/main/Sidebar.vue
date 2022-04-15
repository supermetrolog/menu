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
            <img
              src="../../../../assets/images/bar_icon.svg"
              :alt="category.title"
            />
          </div>
        </div>

        <div class="categories__title">
          <p>{{ category.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { scrollIntoView, scrollBy } from "seamless-scroll-polyfill";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["CATEGORIES"]),
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
        '.products__sub_category[data-category="' + category.id + '"]'
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