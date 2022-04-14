<template>
  <div class="category-form">
    <Loader v-if="loader" />
    <div class="row no-gutters">
      <div class="col-12">
        <p class="title">форма подкатегории</p>
      </div>
    </div>
    <Form @submit="onSubmit" class="autosize px-5">
      <FormGroup class="mb-2">
        <Input
          v-model="form.title"
          label="Название"
          class="col-12"
          :v="v$.form.title"
          @keydown.enter="onSubmit"
        />
        <Select
          v-model="form.category_id"
          label="Категория"
          class="col-12"
          :options="CATEGORIES_LIST"
          :v="v$.form.category_id"
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
import Select from "@/components/common/form/Select";
import Submit from "@/components/common/form/Submit";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SubCategoryForm",
  components: {
    Form,
    FormGroup,
    Input,
    Submit,
    Select,
  },
  data() {
    return {
      v$: useValidate(),
      loader: false,
      form: {
        title: null,
        category_id: null,
      },
    };
  },
  computed: {
    ...mapGetters(["FORMDATA", "CATEGORIES_LIST"]),
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
        category_id: {
          required: helpers.withMessage("Выберите категорию", required),
        },
      },
    };
  },

  methods: {
    ...mapActions([
      "CREATE_SUB_CATEGORY",
      "UPDATE_SUB_CATEGORY",
      "FETCH_DATA",
      "FETCH_SUB_CATEGORIES_LIST",
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

    async update() {
      if (await this.UPDATE_SUB_CATEGORY(this.form)) {
        await this.FETCH_DATA(true);
        this.$emit("updated");
      }
      this.loader = false;
    },
    async create() {
      if (await this.CREATE_SUB_CATEGORY(this.form)) {
        await this.FETCH_DATA(true);
        this.FETCH_SUB_CATEGORIES_LIST(true);

        this.$emit("created");
      }
      this.loader = false;
    },
  },
  async mounted() {
    this.loader = true;
    if (this.FORMDATA) {
      this.form = { ...this.form, ...this.FORMDATA };
    }
    this.loader = false;
  },
};
</script>

<style>
</style>