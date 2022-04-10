<template>
  <div class="products__category">
    <!-- <h1 class="text-center d-block">{{ title }}</h1> -->
    <p class="products__category__title">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: "ProductsCategory",
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style>
</style>