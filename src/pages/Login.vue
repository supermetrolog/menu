<template>
  <div class="login">
    <Loader v-if="loader" />
    <Form @submit="onSubmit" class="autosize mt-3">
      <FormGroup class="mb-3 px-5">
        <Input v-model="form.username" label="логин" class="col-12" />
      </FormGroup>
      <FormGroup class="mb-3 px-5">
        <Input
          v-model="form.password"
          type="password"
          label="пароль"
          class="col-12"
        />
      </FormGroup>
      <FormGroup class="mb-1 px-5">
        <Submit class="col-4 mx-auto btn-myata"> Войти </Submit>
      </FormGroup>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/common/form/Form";
import FormGroup from "@/components/common/form/FormGroup";
import Input from "@/components/common/form/Input";
import Submit from "@/components/common/form/Submit";
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
      loader: false,
      form: {
        username: "admin",
        password: "myata99512hh",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loader = !this.loader;
      console.log("submit");
    },
  },
};
</script>

<style>
</style>