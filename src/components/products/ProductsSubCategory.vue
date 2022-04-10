<template>
  <div class="products__sub_category">
    <p class="products__sub_category__title">
      {{ subCategory.title
      }}<i
        class="fas fa-times for-delete"
        @click="$emit('deleteSubCategory', subCategory)"
        v-if="isAdmin"
      ></i>
    </p>

    <slot />
  </div>
</template>

<script>
export default {
  name: "ProductsSubCategory",
  props: {
    subCategory: {
      type: Object,
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