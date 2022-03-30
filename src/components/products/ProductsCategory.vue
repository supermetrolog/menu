<template>
  <div class="products__category">
    <!-- <h1 class="text-center d-block">{{ title }}</h1> -->
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