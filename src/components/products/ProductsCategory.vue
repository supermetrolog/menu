<template>
  <div class="products__category">
    <p class="products__category__title" v-if="isAdmin">
      {{ category.title
      }}<i
        class="fas fa-times for-delete"
        @click="$emit('deleteCategory', category)"
        v-if="isAdmin"
      ></i>
    </p>

    <slot />
  </div>
</template>

<script>
export default {
  name: "ProductsCategory",
  props: {
    category: {
      type: Object,
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