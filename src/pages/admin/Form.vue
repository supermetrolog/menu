<template>
  <div class="admin-form pt-4">
    <div class="row no-gutters">
      <div class="col-9 mb-3 mx-auto">
        <button
          class="btn btn-large btn-warning-inline"
          @click="$router.push('/admin')"
        >
          Вернуться
        </button>
      </div>
    </div>
    <component :is="form" @updated="onUpdated" @created="onCreated" />
  </div>
</template>

<script>
import CategoryForm from "@/components/admin/forms/CategoryForm";
import SubCategoryForm from "@/components/admin/forms/SubCategoryForm";
import ProductForm from "@/components/admin/forms/ProductForm";
export default {
  name: "AdminForm",
  components: {
    CategoryForm,
    SubCategoryForm,
    ProductForm,
  },
  computed: {
    form() {
      if (this.$route.query.for == "category") {
        return "CategoryForm";
      }
      if (this.$route.query.for == "subcategory") {
        return "SubCategoryForm";
      }
      if (this.$route.query.for == "product") {
        return "ProductForm";
      }
      return null;
    },
  },
  methods: {
    onUpdated() {
      console.log("UPDATED");
      this.$router.push("/admin");
    },
    onCreated() {
      console.log("CREATED");
      this.$router.push("/admin");
    },
  },
};
</script>

<style>
</style>