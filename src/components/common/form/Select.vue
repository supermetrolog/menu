<template>
  <div class="form-item">
    <label class="form-item-label" :class="{ required: required }">
      {{ label }}
    </label>
    <select
      :class="inputClasses"
      :disabled="disabled"
      @change="onInput($event.target.value.trim())"
      @keypress.enter.prevent
      :value="modelValue"
    >
      <option
        :value="option.value"
        v-for="option of options"
        :key="option.value"
      >
        {{ option.title }}
      </option>
    </select>
    <div class="error-container" v-if="v && v.$error">
      <p>{{ v.$errors[0].$message }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
import Mixin from "./mixins";
export default {
  mixins: [Mixin],
  name: "Input",
  data() {
    return {
      searchableVisible: false,
      localeOptions: this.options,
    };
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    v: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    options: {
      type: [Array],
      default: () => [],
    },
  },
  methods: {
    onInput(value) {
      if (value !== this.modelValue) {
        this.validate();
        this.$emit("update:modelValue", value);
      }
    },
  },
  watch: {
    options() {
      this.localeOptions = this.options;
    },
  },
};
</script>

<style>
</style>