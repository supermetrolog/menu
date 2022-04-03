<template>
  <div class="index">
    <ProductsList />
    <ProductsList />
  </div>
</template>

<script>
import ProductsList from "@/components/products/ProductsList";
export default {
  name: "index",
  components: {
    ProductsList,
  },
};
</script>

<style>
</style>