<template>
  <div class="login">
    <Loader v-if="loader" />
    <Form @submit="onSubmit" class="autosize mt-3" v-if="!THIS_USER">
      <FormGroup class="mb-3 px-5">
        <Input
          v-model="form.username"
          label="логин"
          class="col-12"
          :v="v$.form.username"
        />
      </FormGroup>
      <FormGroup class="mb-3 px-5">
        <Input
          v-model="form.password"
          type="password"
          label="пароль"
          class="col-12"
          :v="v$.form.password"
        />
      </FormGroup>
      <FormGroup class="mb-1 px-5">
        <Submit class="col-4 mx-auto btn-myata"> Войти </Submit>
      </FormGroup>
    </Form>

    <div class="row no-gutters mt-3" v-else>
      <div class="col-12">
        <h4 class="text-white text-center">Привет, {{ THIS_USER.username }}</h4>
      </div>
      <div class="col-8 mx-auto mt-2">
        <button
          class="btn btn-large btn-myata-inline"
          @click="$router.push('/admin')"
        >
          Админка
        </button>
      </div>
      <div class="col-8 mx-auto mt-5">
        <button class="btn btn-large btn-danger-inline" @click="onClickLogout">
          Выйти из системы
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "@/components/common/form/Form";
import FormGroup from "@/components/common/form/FormGroup";
import Input from "@/components/common/form/Input";
import Submit from "@/components/common/form/Submit";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    Form,
    FormGroup,
    Input,
    Submit,
  },
  data() {
    return {
      v$: useValidate(),
      loader: false,
      form: {
        username: "admin",
        password: "myata99512hh",
      },
    };
  },
  computed: {
    ...mapGetters(["THIS_USER"]),
  },
  validations() {
    return {
      form: {
        username: {
          required: helpers.withMessage("заполните логин", required),
          minLength: helpers.withMessage(
            "логин не может быть меньше 4 символов",
            minLength(4)
          ),
        },
        password: {
          required: helpers.withMessage("заполните пароль", required),
          minLength: helpers.withMessage(
            "пароль не может быть меньше 4 символов",
            minLength(4)
          ),
        },
      },
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.form.$error) {
        this.loader = true;
        const response = await this.$store.dispatch("LOGIN", this.form);
        if (response !== false) {
          await this.$store.dispatch("INIT");
          await this.$router.push("/admin");
        }
        this.loader = false;
      }
    },

    async onClickLogout() {
      this.loader = true;
      await this.$store.dispatch("LOGOUT");
      this.loader = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>