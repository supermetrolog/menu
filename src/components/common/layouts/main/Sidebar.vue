<template>
  <section class="sidebar">
    <ul class="categories">
      <li
        v-for="category of categories"
        :key="category.name"
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
export default {
  name: "Sidebar",
  data() {
    return {
      categories: [
        {
          title: "кальяны",
          image: "fuck.jpg",
          name: "hookah",
        },
        {
          title: "кухня",
          image: "fuck.jpg",
          name: "kitchen",
        },
        {
          title: "алкоголь",
          image: "fuck.jpg",
          name: "alcohol",
        },
        {
          title: "напитки",
          image: "fuck.jpg",
          name: "drink",
        },
        {
          title: "чай",
          image: "fuck.jpg",
          name: "tea",
        },
      ],
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