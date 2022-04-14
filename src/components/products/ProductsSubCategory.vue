<template>
  <div class="products__sub_category">
    <p class="products__sub_category__title">
      {{ subCategory.title }}
      <i
        v-if="isAdmin"
        class="fas fa-pen for-edit"
        @click="onClickEdit(subCategory)"
      ></i>
      <i
        class="fas fa-times for-delete"
        @click="$emit('deleteSubCategory', subCategory)"
        v-if="isAdmin"
      ></i>
    </p>

    <slot />
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions(["SET_FORMDATA"]),
    onClickEdit(sub_category) {
      this.SET_FORMDATA(sub_category);
      const query = {
        for: "subcategory",
      };
      this.$router.push({ path: "/admin/form", query });
    },
  },
  mounted() {
    this.observer.observe(this.$el);
  },
};
</script>

<style>
</style>