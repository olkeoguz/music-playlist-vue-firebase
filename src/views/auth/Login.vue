<template>
    <form @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Log in</button>
      <button v-else disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const { error, login, isPending } = useLogin();

    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("User logged in", res.user);
        router.push('/');
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>

</style>