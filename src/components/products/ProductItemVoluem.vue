<template>
  <div class="price">
    <div v-if="isSimpleVoluem">
      <p>
        {{ $formatter.number(product.voluem) }}
        <small>{{ product.voluem_type }}</small>
      </p>
    </div>
    <div v-if="isRangeVoluem" class="price__range">
      <p class="price_from">
        {{ $formatter.number(product.voluem_from) }}
      </p>
      /
      <p class="price_to">
        {{ $formatter.number(product.voluem_to) }}
        <small>{{ product.voluem_type }}</small>
      </p>
    </div>
  </div>
</template>

<script>
import { VoluemType } from "@/components/mixins.js";
export default {
  mixins: [VoluemType],
  name: "ProductItemPrice",
  props: {
    product: {
      type: Object,
    },
  },
  computed: {},
};
</script>

<style>
</style>