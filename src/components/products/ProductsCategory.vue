<template>
  <div class="products__category">
    <p class="products__category__title" v-if="isAdmin">
      {{ category.title }}
      <i
        v-if="isAdmin"
        class="fas fa-pen for-edit"
        @click="onClickEdit(category)"
      ></i>
      <i
        class="fas fa-times for-delete"
        @click="$emit('deleteCategory', category)"
        v-if="isAdmin"
      ></i>
    </p>

    <slot />
  </div>
</template>

<script>
import { mapActions } from "vuex";
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

  methods: {
    ...mapActions(["SET_FORMDATA"]),
    onClickEdit(category) {
      this.SET_FORMDATA(category);
      const query = {
        for: "category",
      };
      this.$router.push({ path: "/admin/form", query });
    },
  },
};
</script>

<style>
</style>