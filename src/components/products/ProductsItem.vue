<template>
  <div
    class="products__item row no-gutters"
    @click.prevent.stop="onClickOpenned"
  >
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
        <div class="products__price_and_voluem">
          <ProductItemVoluem :product="product" />
          <ProductItemPrice :product="product" />
        </div>
        <div class="products__ingredients" v-if="product.ingredients">
          <p v-for="ingredient of product.ingredients" :key="ingredient.id">
            {{ ingredient.name }}
          </p>
        </div>
        <div
          class="products__description"
          :class="{ openned, 'text-hidden': isLongedDescription }"
        >
          <p ref="description">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
    <i
      v-if="!selected"
      class="fas fa-bookmark"
      @click.prevent.stop="FAVORITES_PUSH(product)"
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
import ProductItemVoluem from "./ProductItemVoluem.vue";
export default {
  name: "ProductsItem",
  components: {
    ProductItemPrice,
    ProductItemVoluem,
  },
  data() {
    return {
      openned: false,
      isLongedDescription: false,
    };
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
    onClickOpenned() {
      this.openned = !this.openned;
    },
    checkLongDescription() {
      const height = this.$refs.description.clientHeight;
      const maxHeight = 58;
      if (height > maxHeight) {
        return (this.isLongedDescription = true);
      }
      return (this.isLongedDescription = false);
    },
  },
  mounted() {
    this.checkLongDescription();
  },
};
</script>

<style>
</style>