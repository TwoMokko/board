
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuth } from "../../../features/auth/composables";

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})

const { login, loading, error } = useAuth()

const handleLogin = async () => {
  try {
    await login(form.value)

    router.push('/')
  } catch (err) {

  }
}
</script>
<template>
<form @submit.prevent="handleLogin">
  <div v-if="error" class="error">
    {{ error.message }}
  </div>

  <input v-model="form.username" placeholder="name" />
  <input v-model="form.password" placeholder="password" type="password" />
  <button type="submit">
    {{ loading ? '...' : 'войти' }}
  </button>
</form>
</template>