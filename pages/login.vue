<script setup lang="ts">
import { useAppwriteAuth } from "~/composables/useAppwriteAuth";

const { user, loading, login, logout } = useAppwriteAuth();


const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    // Redirect or show success message
  } catch (error) {
    // Handle error
  }
};


</script>

<template>
  <div class="login-container container mx-auto">

    <div class="login-page max-w-md mx-auto flex flex-col gap-2 m-2 md:max-w-96 ">
      <p>
        {{ user ? `Logged in as ${ user.name }` : 'Not logged in' }}
      </p>
      <div class="email-wrapper">
        <Input type="email" placeholder="Email" v-model="email"/>
      </div>
      <div class="password-wrapper">
        <Input type="password" placeholder="Password" v-model="password"/>
      </div>
      <div class="submit-login">
        <Button @click="handleLogin">Login</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>