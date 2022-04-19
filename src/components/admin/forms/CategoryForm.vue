<template>
  <div class="category-form">
    <Loader v-if="loader" />
    <div class="row no-gutters">
      <div class="col-12">
        <p class="title">форма категории</p>
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
        <FileInput
          v-model:native="form.fileList"
          v-model:data="form.image"
          :multiple="false"
          :accept="'image/*'"
          label="Документы"
          class="col-12"
        >
          Выбрать файлы
        </FileInput>
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
import Submit from "@/components/common/form/Submit";
import FileInput from "@/components/common/form/FileInput.vue";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CategoryForm",
  components: {
    Form,
    FormGroup,
    Input,
    Submit,
    FileInput,
  },
  data() {
    return {
      v$: useValidate(),
      loader: false,
      form: {
        title: null,
        image: null,
        fileList: [],
      },
    };
  },
  computed: {
    ...mapGetters(["FORMDATA"]),
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
      },
    };
  },

  methods: {
    ...mapActions([
      "CREATE_CATEGORY",
      "UPDATE_CATEGORY",
      "FETCH_CATEGORIES",
      "FETCH_DATA",
    ]),
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.form.$error) {
        this.loader = true;
        if (this.FORMDATA) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
      }
    },

    async updateCategory() {
      if (await this.UPDATE_CATEGORY(this.form)) {
        await this.FETCH_CATEGORIES(true);
        await this.FETCH_DATA(true);
        this.$emit("updated");
      }
      this.loader = false;
    },
    async createCategory() {
      if (await this.CREATE_CATEGORY(this.form)) {
        await this.FETCH_CATEGORIES(true);
        await this.FETCH_DATA(true);
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