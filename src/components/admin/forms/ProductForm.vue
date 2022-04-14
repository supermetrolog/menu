<template>
  <div class="category-form">
    <Loader v-if="loader" />
    <div class="row no-gutters">
      <div class="col-12">
        <p class="title">форма продукта</p>
      </div>
    </div>
    <Form @submit="onSubmit" class="autosize px-5">
      <FormGroup class="mb-2">
        <Input
          v-model="form.title"
          required
          label="Название"
          class="col-12 mb-2"
          :v="v$.form.title"
        />
        <Select
          required
          v-model="form.sub_category_id"
          label="Подкатегория"
          class="col-12 mb-2"
          :options="SUB_CATEGORIES_LIST"
          :v="v$.form.sub_category_id"
        />
        <Textarea
          v-model="form.description"
          label="Описание"
          class="col-12 mb-2"
        />
        <Tags
          v-model="form.ingredients"
          label="Ингредиенты"
          class="col-12 mb-2"
          searchable
          :options="INGREDIENTS"
        />
        <Input
          v-model="form.price"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Цена"
          class="col-12 mb-2"
          @input="priceInput"
        />
        <Input
          v-model="form.price_old"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Цена старая"
          class="col-12 mb-2"
          @input="priceInput"
        />
        <Input
          v-model="form.price_from"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Цена от"
          class="col-12 mb-2"
          @input="priceFromToInput"
          :v="v$.form.price_from"
        />
        <Input
          v-model="form.price_to"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Цена до"
          class="col-12 mb-2"
          @input="priceFromToInput"
          :v="v$.form.price_to"
        />
        <Select
          v-model="form.voluem_type"
          label="Тип объема"
          class="col-12 mb-2"
          :options="voluemTypeOptions"
          :v="v$.form.voluem_type"
        />
        <Input
          v-model="form.voluem"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Объем"
          class="col-12 mb-2"
          @input="voluemInput"
        />
        <Input
          v-model="form.voluem_from"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Объем от"
          class="col-12 mb-2"
          @input="voluemFromToInput"
          :v="v$.form.voluem_from"
        />
        <Input
          v-model="form.voluem_to"
          :maska="{
            mask: 'Z*',
            tokens: { Z: { pattern: /[0-9]/ } },
          }"
          label="Объем до"
          class="col-12 mb-2"
          @input="voluemFromToInput"
          :v="v$.form.voluem_to"
        />
      </FormGroup>
      <FormGroup class="mt-4">
        <Submit class="col-12">
          {{ FORMDATA ? "Сохранить" : "Создать" }}
        </Submit>
      </FormGroup>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/common/form/Form";
import FormGroup from "@/components/common/form/FormGroup";
import Input from "@/components/common/form/Input";
import Tags from "@/components/common/form/Tags";
import Textarea from "@/components/common/form/Textarea";
import Select from "@/components/common/form/Select";
import Submit from "@/components/common/form/Submit";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { VoluemType } from "@/const";
export default {
  name: "ProductForm",
  components: {
    Form,
    FormGroup,
    Input,
    Submit,
    Select,
    Textarea,
    Tags,
  },
  data() {
    return {
      v$: useValidate(),
      loader: false,
      voluemTypeOptions: VoluemType,
      form: {
        title: null,
        sub_category_id: null,
        description: null,
        price: null,
        price_old: null,
        price_from: null,
        price_to: null,
        voluem: null,
        voluem_from: null,
        voluem_to: null,
        voluem_type: null,
        is_new: null,
        ingredients: [],
      },
    };
  },
  computed: {
    ...mapGetters(["FORMDATA", "SUB_CATEGORIES_LIST", "INGREDIENTS"]),
  },
  validations() {
    return {
      form: {
        title: {
          required: helpers.withMessage("заполните поле", required),
          minLength: helpers.withMessage(
            "название не может быть меньше 2 символов",
            minLength(2)
          ),
        },
        sub_category_id: {
          required: helpers.withMessage("Выберите категорию", required),
        },
        voluem_type: {
          voluemTypeRequired: helpers.withMessage(
            "сделайте выбор",
            this.voluemTypeRequired
          ),
        },
        voluem_from: {
          voluemFromRequired: helpers.withMessage(
            "заполните поле",
            this.voluemFromRequired
          ),
        },
        voluem_to: {
          voluemToRequired: helpers.withMessage(
            "заполните поле",
            this.voluemToRequired
          ),
        },
        price_from: {
          priceFromRequired: helpers.withMessage(
            "заполните поле",
            this.priceFromRequired
          ),
        },
        price_to: {
          priceToRequired: helpers.withMessage(
            "заполните поле",
            this.priceToRequired
          ),
        },
      },
    };
  },

  methods: {
    ...mapActions([
      "CREATE_PRODUCT",
      "UPDATE_PRODUCT",
      "FETCH_DATA",
      "FETCH_SUB_CATEGORIES_LIST",
      "FETCH_INGREDIENTS",
    ]),
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.form.$error) {
        this.loader = true;
        if (this.FORMDATA) {
          this.update();
        } else {
          this.create();
        }
      }
    },
    priceInput() {
      this.form.price_from = null;
      this.form.price_to = null;
    },
    priceFromToInput() {
      this.form.price = null;
      this.form.price_old = null;
    },
    voluemInput() {
      this.form.voluem_from = null;
      this.form.voluem_to = null;
    },
    voluemFromToInput() {
      this.form.voluem = null;
    },
    voluemTypeRequired(value) {
      if (this.form.voluem || this.form.voluem_from || this.form.voluem_to) {
        if (!value) {
          return false;
        }
      }
      return true;
    },
    voluemToRequired(value) {
      if (this.form.voluem_from && !value) {
        return false;
      }
      return true;
    },
    voluemFromRequired(value) {
      if (this.form.voluem_to && !value) {
        return false;
      }
      return true;
    },
    priceToRequired(value) {
      if (this.form.price_from && !value) {
        return false;
      }
      return true;
    },
    priceFromRequired(value) {
      if (this.form.price_to && !value) {
        return false;
      }
      return true;
    },
    async update() {
      if (await this.UPDATE_PRODUCT(this.form)) {
        await this.FETCH_DATA(true);
        this.$emit("updated");
      }
      this.loader = false;
    },
    async create() {
      if (await this.CREATE_PRODUCT(this.form)) {
        await this.FETCH_DATA(true);
        this.$emit("created");
      }
      this.loader = false;
    },
  },

  async mounted() {
    this.loader = true;
    await Promise.all([
      this.FETCH_SUB_CATEGORIES_LIST(),
      this.FETCH_INGREDIENTS(true),
    ]);
    if (this.FORMDATA) {
      this.form = { ...this.form, ...this.FORMDATA };
    }
    this.loader = false;
  },
  watch: {
    form: {
      handler() {
        console.log("FORM: ", this.form);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>