<template>
    <div class="login">
      <div class="login__content">
        <label for="">Логин</label>
        <input 
          type="text"
          v-model="username"
        />
  
        <label for="">Пароль</label>
        <input 
          :type="isPasswordVisible ? 'text' : 'password'" 
          id="password"
          v-model="password"
          inputmode="text"
        />
        <button @click="togglePasswordVisibility" type="button">
            {{ isPasswordVisible ? 'Скрыть' : 'Показать' }}
        </button>

        <button 
          @click="login"
          class="login__btn"
        >Войти</button>
        <span @click="$router.push('/register')" class="login__register__link">Зарегистрироваться</span>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
  
const username = ref('')
const password = ref('')

const isPasswordVisible = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
  
const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username.value, password: password.value })
      })
  
      if (!response.ok) {
        throw new Error('Ошибка при входе в систему')
      }
  
      const data = await response.json()
      console.log('response data', data)
  
      if (data && data.access_token) {
        localStorage.setItem('authToken', data.access_token)
        router.push('/main')
        username.value = ''
        password.value = ''
      } else {
        console.error('Токен не был получен с сервера', data)
        alert('Ошибка: Токен не получен, проверьте введенные данные!')
      }
    } catch (error) {
      console.error('Ошибка при входе:', error)
    }
  }
</script>
  
<style scoped>
.login {
    width: 100%;
    height: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.login__content {
    width: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
  
.login__register__link {
    text-align: center;
    display: block;
    margin-top: 10px;
    color: blue;
    cursor: pointer;
}
</style>
  