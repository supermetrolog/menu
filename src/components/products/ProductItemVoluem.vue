<template>
  <div class="price">
    <div v-if="isSimpleVoluem">
      <p>
        {{ $formatter.number(product.voluem) }}
        <small>{{ voluemType }}</small>
      </p>
    </div>
    <div v-if="isRangeVoluem" class="price__range">
      <p class="price_from">
        {{ $formatter.number(product.voluem_from) }}
      </p>
      /
      <p class="price_to">
        {{ $formatter.number(product.voluem_to) }}
        <small>{{ voluemType }}</small>
      </p>
    </div>
  </div>
</template>

<script>
import { VoluemType } from "@/components/mixins.js";
import { VoluemType as VT } from "@/const";
export default {
  mixins: [VoluemType],
  name: "ProductItemPrice",
  props: {
    product: {
      type: Object,
    },
  },
  computed: {
    voluemType() {
      const type = VT.find((item) => item.value == this.product.voluem_type);
      if (type) {
        return type.title;
      }
      return null;
    },
  },
};
</script>

<style>
</style>