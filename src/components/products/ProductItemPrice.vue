<template>
  <div class="price">
    <div v-if="isSimplePrice">
      <p>
        {{ $formatter.currency(product.price, { maximumFractionDigits: 0 }) }}
      </p>
    </div>
    <div v-if="isSimplePriceWithOldPrice" class="price__with_old_price">
      <p class="old_price">
        {{
          $formatter.currency(product.price_old, { maximumFractionDigits: 0 })
        }}
      </p>
      <p class="new_price">
        {{ $formatter.currency(product.price, { maximumFractionDigits: 0 }) }}
      </p>
    </div>
    <div v-if="isRangePrice" class="price__range">
      <p class="price_from">
        {{
          $formatter.number(product.price_from, { maximumFractionDigits: 0 })
        }}
      </p>
      /
      <p class="price_to">
        {{
          $formatter.currency(product.price_to, { maximumFractionDigits: 0 })
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { PriceType } from "@/components/mixins.js";
export default {
  mixins: [PriceType],
  name: "ProductItemPrice",
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style>
</style>