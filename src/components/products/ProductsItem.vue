<template>
  <div class="products__item row no-gutters">
    <div class="col-3 align-self-center">
      <div class="products__image">
        <div class="image-container">
          <img src="../../assets/images/hookah.png" alt="" />
        </div>
      </div>
    </div>
    <div class="col-9">
      <div class="products__params">
        <div class="products__title">
          <p :class="{ 'text-warning': selected }">
            {{ product.title }}
          </p>
        </div>
        <div class="products__price">
          <ProductItemPrice :product="product" />
        </div>
        <div class="products__description">
          <p>
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
    <i
      v-if="!selected"
      class="fas fa-bookmark"
      @click="FAVORITES_PUSH(product)"
      :class="{ selected: FAVORITES.find((item) => item.id == product.id) }"
    ></i>
    <i
      v-else
      class="fas fa-times for-delete"
      @click="FAVORITES_FILTER(product)"
    ></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductItemPrice from "./ProductItemPrice.vue";
export default {
  name: "ProductsItem",
  components: {
    ProductItemPrice,
  },
  props: {
    product: {
      type: Object,
    },
    selected: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["FAVORITES"]),
  },
  methods: {
    ...mapActions(["FAVORITES_PUSH", "FAVORITES_FILTER"]),
  },
};
</script>

<style>
</style>