<template>
    <form  @submit.prevent="handleSubmit">
      <h2>Signup</h2>
      <input type="text" placeholder="Display Name" v-model="displayName" />
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-else disabled>Loading</button>
    </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const {error,signup,isPending} = useSignup();

    const router = useRouter();

    const handleSubmit = async () => {
      const res = await signup(email.value,password.value,displayName.value);

      if(!error.value) {
        console.log('User signed up',res.user);
        router.push('/');
      }
    }

    return {email,password,displayName,error,handleSubmit,isPending}
  },
};
</script>

<style>
</style>