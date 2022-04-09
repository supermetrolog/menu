<template>
  <div class="admin-main">
    <div class="row">
      <div class="col-10 mb-5 mx-auto">
        <button
          class="btn btn-large btn-myata-inline"
          @click="$router.push('/')"
        >
          На главную
        </button>
      </div>
      <div class="col-10 mb-3 mx-auto">
        <button class="btn btn-large btn-myata-inline">
          Создать подкатигорию
        </button>
      </div>
      <div class="col-10 mb-3 mx-auto">
        <button class="btn btn-large btn-myata-inline">Создать продукт</button>
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
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>