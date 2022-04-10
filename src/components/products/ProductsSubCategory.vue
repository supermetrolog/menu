<template>
  <div class="products__sub_category">
    <p class="products__sub_category__title">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: "ProductsSubCategory",
  props: {
    title: {
      type: String,
    },
    observer: {
      type: Object,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.observer.observe(this.$el);
  },
};
</script>

<style>
</style>