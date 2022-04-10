<template>
  <div class="admin-main pt-4">
    <div class="row no-gutters">
      <div class="col-10 mb-5 mx-auto">
        <button
          class="btn btn-large btn-warning-inline"
          @click="$router.push('/')"
        >
          На главную
        </button>
      </div>
      <div class="col-10 mb-3 mx-auto">
        <button
          class="btn btn-large btn-myata-inline"
          @click="onClickCreate('category')"
        >
          Создать категорию
        </button>
      </div>
      <div class="col-10 mb-3 mx-auto">
        <button
          class="btn btn-large btn-myata-inline"
          @click="onClickCreate('subcategory')"
        >
          Создать подкатигорию
        </button>
      </div>
      <div class="col-10 mb-3 mx-auto">
        <button
          class="btn btn-large btn-myata-inline"
          @click="onClickCreate('product')"
        >
          Создать продукт
        </button>
      </div>
    </div>
    <ProductsList />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsList from "@/components/products/ProductsList";
export default {
  name: "AdminMain",
  components: {
    ProductsList,
  },
  computed: {
    ...mapGetters(["THIS_USER", "SUB_CATEGORIES"]),
  },
  methods: {
    onClickCreate(for_form) {
      const query = {
        for: for_form,
      };
      this.$router.push({ path: "/admin/form", query });
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>