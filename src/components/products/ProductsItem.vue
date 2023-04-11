<template>
  <div
    class="products__item row no-gutters"
    @click.prevent.stop="onClickOpenned"
  >
    <div class="col-3 align-self-center" @click.prevent.stop="addToFavorites">
      <div class="products__image" :class="{ 'default-image': !imageExist }">
        <div class="image-container">
          <img :src="imageSrc" alt="" />
        </div>
      </div>
    </div>
    <div class="col-9">
      <div class="products__params">
        <div class="products__title" @click.prevent.stop="addToFavorites">
          <p
            :class="{
              'text-warning': FAVORITES.find((item) => item.id == product.id),
            }"
          >
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
      let image = category.image;
      if (this.product.image) {
        image = this.product.image;
      }
      if (process.env.NODE_ENV == "development") {
        return "http://menu/uploads/" + image;
      } else {
        return "https://api.myatatasty.ru/uploads/" + image;
      }
    },
    imageExist() {
      return !!this.product.image;
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
    addToFavorites() {
      if (!this.selected) {
        this.FAVORITES_PUSH(this.product);
      } else {
        this.FAVORITES_FILTER(this.product);
      }
    },
  },
  mounted() {
    this.checkLongDescription();
    if (this.observer) {
      this.observer.observe(this.$el);
    }
    if (this.observerCategory) {
      this.observerCategory.observe(this.$el);
    }
  },
};
</script>

<style>
</style>