<template>
    <div class="container">
        <div v-if="isBlocked" class="blocked__message">
            Ваш аккаунт заблокирован. Обратитесь к администратору для разблокировки.
        </div>

        <div v-if="user?.role === 'admin'" class="admin-controls">
        <label for="userId">Введите ID пользователя:</label>
        <input
          type="number"
          id="userId"
          v-model="targetUserId"
          placeholder="Введите ID пользователя"
        />
  
        <button @click="blockUser" class="block-button">Заблокировать</button>
        <button @click="unblockUser" class="unblock-button">Разблокировать</button>
      </div>

        <div v-if="!isBlocked" class="change__password">
            <p>Оставшиеся дни жизни пароля: {{ daysRemaining }}</p>
            <span>Cменить пароль</span>

            <label for="current-password">Старый пароль</label>
            <input 
                :type="isPasswordVisible ? 'text' : 'password'" 
                id="current-password"
                v-model="currentPassword"
                inputmode="text"
                placeholder="Введите текущий пароль"
            >

            <label for="new-password">Новый пароль</label>
            <input 
                :type="isPasswordVisible ? 'text' : 'password'" 
                id="new-password"
                v-model="newPassword"
                placeholder="Введите новый пароль"
                inputmode="text"
                @input="validatePassword"
            >

            <label for="confirm-password">Подтвердите новый пароль</label>
            <input 
                :type="isPasswordVisible ? 'text' : 'password'" 
                id="confirm-password"
                v-model="confirmPassword"
                inputmode="text"
                placeholder="Подтвердите новый пароль"
            >

            <button @click="togglePasswordVisibility" type="button">
                {{ isPasswordVisible ? 'Скрыть' : 'Показать' }}
            </button>

            <p v-if="errors.length" style="color: red;">
                <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
            </p>

            <button @click="changePassword" class="change__password__btn">Сменить пароль</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errors = ref<string[]>([])
const daysRemaining = ref<number | null>(null)
const isExpiringSoon = ref(false)
const isBlocked = ref(false)
const user = ref<{ role: string } | null>(null);
const targetUserId = ref<number | null>(null);

const isPasswordVisible = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const validatePassword = () => {
  errors.value = []

  if (!/(.*\d){1}/.test(newPassword.value)) {
    errors.value.push('Пароль должен содержать хотя бы 1 цифру.')
  }
  if (!/(.*[a-zA-Z]){3}/.test(newPassword.value)) {
    errors.value.push('Пароль должен содержать хотя бы 3 латинских буквы.')
  }
  if (!/(.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]){2}/.test(newPassword.value)) {
    errors.value.push('Пароль должен содержать хотя бы 2 специальных символа.')
  }
  if (!/(.*[а-яА-Я]){3}/.test(newPassword.value)) {
    errors.value.push('Пароль должен содержать хотя бы 3 кириллические буквы.')
  }
  if (newPassword.value.length < 9) {
    errors.value.push('Пароль должен быть длиной не менее 9 символов.')
  }
  if (newPassword.value.length > 19) {
    errors.value.push('Пароль должен быть длиной не более 19 символов.')
  }
  if (newPassword.value !== confirmPassword.value) {
    errors.value.push('Пароли не совпадают.')
  }
}

const changePassword = async () => {
    validatePassword()

    if (errors.value.length > 0) {
        console.error('Смена пароля невозможна. Исправьте ошибки.')
        return
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                currentPassword: currentPassword.value,
                newPassword: newPassword.value,
            }),
        })

        const data = await response.json()

        if (response.ok) {
            console.log('Пароль успешно изменен')
        } else {
            console.error('Ошибка при смене пароля:', response.status, data)
        }
    } catch (error) {
        console.error('Ошибка при смене пароля:', error)
    }
}

const getUserInfo = async() => {
    try {
        const response = await axios.get('http://localhost:3000/api/users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            }
        })
        console.log('Данные пользователя:', response.data)
        return response.data
    } catch (error) {
        console.error('Ошибка при получении данных о текущем пользователе:', error)
    }
}

const blockUser = async () => {
  if (!targetUserId.value) {
    console.error('Введите ID пользователя для блокировки.');
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/${targetUserId.value}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`Пользователь с ID ${targetUserId.value} заблокирован.`);
    } else {
      console.error('Ошибка при блокировке:', response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка от сервера:', error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      console.error('Ошибка при блокировке:', error.message);
    } else {
      console.error('Неизвестная ошибка при блокировке:', error);
    }
  }
}

const unblockUser = async () => {
  if (!targetUserId.value) {
    console.error('Введите ID пользователя для разблокировки.');
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/${targetUserId.value}/unblock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`Пользователь с ID ${targetUserId.value} разблокирован.`);
    } else {
      console.error('Ошибка при разблокировке:', response.data.message);
    }
  } catch (error) {
    console.error('Ошибка при разблокировке:', error.response?.data?.message || error.message);
  }
};

onMounted(async () => {
  try {
    const userResponse = await axios.get('http://localhost:3000/api/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    
    user.value = userResponse.data;
    isBlocked.value = userResponse.data.isBlocked;

    if (!isBlocked.value) {
      const passwordLifeResponse = await axios.get('http://localhost:3000/api/auth/password-life', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      daysRemaining.value = passwordLifeResponse.data.daysRemaining;
      isExpiringSoon.value = passwordLifeResponse.data.isExpiringSoon;

      if (isExpiringSoon.value) {
        showPasswordExpiryWarning();
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при запросе:', error.response?.data);
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  }
});

function showPasswordExpiryWarning() {
    alert(`Срок действия вашего пароля истекает через ${daysRemaining.value} дней. Пожалуйста, смените пароль!`)
}
</script>
<style scoped>
.container {
    width: 100%;
    height: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.change__password {
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