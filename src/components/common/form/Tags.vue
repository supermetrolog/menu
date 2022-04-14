<template>
  <div class="form-item tags">
    <label class="form-item-label" :class="{ required: required }">
      {{ label }}
      <input
        :class="inputClasses"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @input.stop="onInput($event.target.value.trim())"
        v-model="input"
        @change.stop
        @focus="onFocus"
        @keypress.enter.prevent="selectFirstItem"
        v-maska="maska"
        ref="input"
        :min="min"
        :max="max"
      />
    </label>
    <div class="tags-list">
      <span class="tag" v-for="tag of field" :key="tag.title">
        {{ tag.title }}
        <i class="fas fa-times" @click="deleteItem(tag)"></i>
      </span>
    </div>
    <div class="searchable" v-if="searchable && searchableVisible">
      <div class="searchable-container" v-show="searchableVisible">
        <ul>
          <li
            :class="{ active: index == 0 }"
            v-for="(item, index) in localeOptions"
            :key="item.title"
            @click="selectItem(item)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
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
  name: "Tags",
  data() {
    return {
      searchableVisible: false,
      localeOptions: this.options,
      field: this.modelValue,
      input: null,
    };
  },
  props: {
    modelValue: {
      type: [Array],
      default: () => [],
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
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    maska: {
      default: null,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [Array, Object],
      default: () => [],
    },
    min: {
      type: [String, Number],
    },
    max: {
      type: [String, Number],
    },
    name: {
      type: String,
      default: null,
    },
  },
  methods: {
    onInput(value) {
      if (value !== this.modelValue) {
        this.validate();
        // this.$emit("update:modelValue", value);
        this.search(value);
      }
    },
    onChange() {
      this.validate();
      if (this.name) {
        let array = [];
        this.field.forEach((item) => {
          array.push({ [this.name]: item });
        });
        this.$emit("update:modelValue", array);
        this.$emit("change", this.field);
      } else {
        this.$emit("update:modelValue", this.field);
        this.$emit("change", this.field);
      }
    },
    search(value) {
      if (!this.searchable) {
        return;
      }
      this.searchableVisible = true;
      this.localeOptions = [];
      this.options.map((item) => {
        if (item.title.indexOf(value) !== -1) {
          this.localeOptions.push(item);
        }
      });
      this.localeOptions = this.localeOptions.filter((item) => item.new != 1);
      if (value) {
        this.localeOptions.push({ new: 1, title: value });
      }
    },
    onFocus() {
      if (this.searchable) {
        this.searchableVisible = true;
      }
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.searchableVisible = false;
      }
    },
    deleteItem(tag) {
      this.field = this.field.filter((item) => item.title != tag.title);
    },
    selectItem(item) {
      if (this.field.find((field) => field.title == item.title)) {
        this.searchableVisible = false;
        return;
      }
      this.field.push({ title: item.title });
      this.input = null;
      this.onChange();
      this.localeOptions = this.options;
      // this.local;
      this.searchableVisible = false;
    },
    selectFirstItem() {
      if (!this.input) {
        return;
      }
      this.selectItem(this.localeOptions[0]);
    },
    setData() {
      this.field = [];
      this.modelValue.forEach((item) => {
        this.field.push(item[this.name]);
      });
    },
  },
  mounted() {
    if (this.searchable) {
      document.addEventListener("click", this.close);
    }
    if (this.name) {
      this.setData();
    }
  },
  beforeUnmount() {
    if (this.searchable) {
      document.removeEventListener("click", this.close);
    }
  },
  watch: {
    options() {
      this.localeOptions = this.options;
    },
    modelValue() {
      if (this.name) {
        this.setData();
      } else {
        this.field = this.modelValue;
      }
    },
  },
};
</script>

<style>
</style>