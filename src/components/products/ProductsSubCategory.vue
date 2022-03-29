<template>
  <div class="products__sub-category">
    <h3>{{ title }}</h3>
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