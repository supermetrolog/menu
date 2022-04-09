<template>
  <div class="form-item">
    <button class="btn btn-large" :class="buttonClasses" :disabled="disabled">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: "Submit",
  props: {
    buttonClasses: {
      type: String,
      default: "btn-myata-inline",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>