<template>
    <div class="register">
      <div class="register__content">
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
          @input="validatePassword"
          inputmode="text"
        />
        <button @click="togglePasswordVisibility" type="button">
            {{ isPasswordVisible ? 'Скрыть' : 'Показать' }}
        </button>

        <label for="">E-mail</label>
        <input 
          type="text"
          v-model="email"
        />

        <p v-if="errors.length" style="color: red;">
            <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
        </p>
  
        <button 
          @click="register"
          class="register__btn"
        >Войти</button>
        <span @click="$router.push('/')" class="register__back__link">Вернуться к авторизации</span>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
  
const username = ref('')
const password = ref('')
const email = ref('')

const register = async () => {
    validatePassword()

    if (errors.value.length > 0) {
        console.log('Регистрация невозможна, исправьте ошибки')
        return
    }

    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username.value, password: password.value, email: email.value })
        })

        const data = await response.json()
        
        if (response.ok) {
            console.log('Аккаунт успешно создан')
        } else {
            console.error('Ошибка при создании аккаунта:', response.status, data)
        }
    } catch (error) {
        console.error('Ошибка при создании аккаунта:', error)
    }
}

const errors = ref<string[]>([])

const validatePassword = () => {
    errors.value = []

    if (!/(.*\d){1}/.test(password.value)) {
        errors.value.push('Пароль должен содержать хотя бы 1 цифру.')
    }
    if (!/(.*[a-zA-Z]){3}/.test(password.value)) {
        errors.value.push('Пароль должен содержать хотя бы 3 латинских буквы.')
    }
    if (!/(.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]){2}/.test(password.value)) {
        errors.value.push('Пароль должен содержать хотя бы 2 специальных символа.')
    }
    if (!/(.*[а-яА-Я]){3}/.test(password.value)) {
        errors.value.push('Пароль должен содержать хотя бы 3 кириллические буквы.')
    }
    if (password.value.length < 9) {
        errors.value.push('Пароль должен быть длиной не менее 9 символов.')
    }
    if (password.value.length > 19) {
        errors.value.push('Пароль должен быть длиной не более 19 символов.')
    }
}

const isPasswordVisible = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>
<style>
.register {
    width: 100%;
    height: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.register__content {
    width: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
  
.register__back__link {
    text-align: center;
    display: block;
    margin-top: 10px;
    color: blue;
    cursor: pointer;
}
</style>