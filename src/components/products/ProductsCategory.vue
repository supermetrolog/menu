<template>
  <div class="products__category">
    <p class="products__category__title" v-if="isAdmin">{{ title }}</p>
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>