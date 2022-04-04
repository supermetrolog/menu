<template>
  <section class="sidebar">
    <ul class="categories">
      <li
        v-for="category of categories"
        :key="category.id"
        :title="category.title"
        @click="onClickCategory(category)"
        :class="{ active: $route.query.category == category.name }"
      >
        <div class="categories__image">
          <div class="image-container">
            <img
              src="../../../../assets/images/logo.png"
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
import { Menu } from "@/const";
export default {
  name: "Sidebar",
  data() {
    return {
      categories: Menu,
    };
  },
  methods: {
    onClickCategory(category) {
      let query = {
        category: category.name,
      };
      this.$router.replace({
        query,
      });
    },
  },
};
</script>

<style>
</style>