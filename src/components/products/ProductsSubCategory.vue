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
  },
};
</script>

<style>
</style>