<template>
  <div
    class="products__item row no-gutters"
    @click.prevent.stop="onClickOpenned"
  >
    <div class="col-3 align-self-center">
      <div class="products__image">
        <div class="image-container">
          <img :src="imageSrc" alt="" />
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
            {{ ingredient.title }}
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
    <template v-if="!isAdmin">
      <i
        v-if="!selected"
        class="fas fa-bookmark"
        @click.prevent.stop="FAVORITES_PUSH(product)"
        :class="{ selected: FAVORITES.find((item) => item.id == product.id) }"
      ></i>
      <i
        v-else
        class="fas fa-times for-delete"
        :class="{ selected: selected }"
        @click="FAVORITES_FILTER(product)"
      ></i>
    </template>
    <template v-else>
      <i
        class="fas fa-trash-alt for-delete"
        @click="$emit('deleteProduct', product)"
      ></i>
      <i class="fas fa-pen for-edit" @click="onClickEdit(product)"></i>
    </template>
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    observer: {
      type: Object,
    },
    observerCategory: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["FAVORITES", "DATA"]),
    imageSrc() {
      const category = this.DATA.find((category) =>
        category.subCategories.find(
          (subCategory) => subCategory.id == this.product.sub_category_id
        )
      );
      console.log("CATEGORY", category);
      if (process.env.NODE_ENV == "development") {
        return "http://menu/uploads/" + category.image;
      } else {
        return "https://myatatasty.store/uploads/" + category.image;
      }
    },
  },
  methods: {
    ...mapActions(["FAVORITES_PUSH", "FAVORITES_FILTER", "SET_FORMDATA"]),
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
    onClickEdit(product) {
      this.SET_FORMDATA(product);
      const query = {
        for: "product",
      };
      this.$router.push({ path: "/admin/form", query });
    },
  },
  mounted() {
    this.checkLongDescription();
    this.observer.observe(this.$el);
    this.observerCategory.observe(this.$el);
  },
};
</script>

<style>
</style>