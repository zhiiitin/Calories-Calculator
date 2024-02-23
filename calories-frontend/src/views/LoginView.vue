<template>
    <div class="login-container d-flex align-center">
      <v-container>
        <v-card
          class="mx-auto pa-12"
          hover
          color="#FCFCFC"
          rounded="xl"
          max-width="400"
          elevation="24"
        >
          <template #title>
            <div @click.prevent="setTestData()">
              {{ isRegisterMode ? "註冊會員" : "登入會員" }}
            </div>
          </template>

          <transition
            name="fade"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <template v-if="!isRegisterMode">
              <v-form class="mt-5">
                <v-text-field
                  v-model="loginData.email"
                  label="信箱"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入信箱"
                  prepend-inner-icon="mdi-email"
                />
                <v-text-field
                  v-model="loginData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="密碼"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入密碼"
                  prepend-inner-icon="mdi-lock"
                  @click:append-inner="showPassword = !showPassword"
                />
              </v-form>
            </template>
            <template v-else>
              <v-form class="mt-5">
                <v-text-field
                  v-model="registerData.email"
                  label="信箱"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入信箱"
                  required
                  prepend-inner-icon="mdi-email"
                  :error-messages="emailErrorMsg"
                  @input="v$.email.$touch"
                  @blur="v$.email.$touch"
                />
                <v-text-field
                  v-if="isRegisterMode"
                  v-model="registerData.userName"
                  label="使用者名稱"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入使用者名稱"
                  prepend-inner-icon="mdi-account"
                  :error-messages="userNameErrorMsg"
                  @input="v$.userName.$touch"
                  @blur="v$.userName.$touch"
                />
                <v-text-field
                  v-model="registerData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-inner-icon="mdi-lock"
                  label="密碼"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入密碼"
                  :error-messages="passwordErrorMsg"
                  @input="v$.password.$touch"
                  @blur="v$.password.$touch"
                  @click:append-inner="showPassword = !showPassword"
                />
                <v-text-field
                  v-model="registerData.passwordCheck"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-inner-icon="mdi-lock"
                  label="確認"
                  variant="outlined"
                  density="comfortable"
                  placeholder="請輸入確認密碼"
                  :error-messages="passwordCheckErrorMsg"
                  @input="v$.passwordCheck.$touch"
                  @blur="v$.passwordCheck.$touch"
                  @click:append-inner="showPassword = !showPassword"
                />
              </v-form>
            </template>
          </transition>
          <v-btn
            type="submit"
            class="mt-5 custom-btn"
            width="500"
            :class="isRegisterMode ? 'mb-5' : ''"
            variant="tonal"
            :text="isRegisterMode ? '註冊' : '登入'"
            @click="isRegisterMode ? handleSubmit() : handleLogin()"
          />
          <v-row>
            <v-card-text
              class="text-center mt-3"
              @click.prevent="handleRegister"
            >
              <a
                class="text-black text-decoration-none"
              >{{ isRegisterMode ? '已有帳號嗎? 點擊登入' : '立即註冊' }}
                <v-icon
                  icon="mdi-chevron-right"
                />
              </a>
            </v-card-text>
          </v-row>
        </v-card>
      </v-container>
    </div>
    <MessageDialog
      v-model:visible="showMessageDialog"
      :title="dialogTitle"
      :message="dialogMessage"
    />
  </template>
<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  email, required, helpers, sameAs, minLength,
} from '@vuelidate/validators';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MessageDialog from '../components/MessageDialog.vue';

// dialog data
const dialogMessage = ref('');
const dialogTitle = ref();

const showPassword = ref(false);
const isRegisterMode = ref(false);
const showMessageDialog = ref(false);

const store = useStore();
const router = useRouter();

// 初始化註冊資料
const initRegisterData = {
  email: '',
  userName: '',
  password: '',
  passwordCheck: '',
};

// 初始化登入資料
const initLoginData = {
  email: '',
  password: '',
};

const registerData = ref({
  ...initRegisterData,
});

const loginData = ref({
  ...initLoginData,
});

const registerRules = {
  email: {
    required: helpers.withMessage('此欄位為必填', required),
    email: helpers.withMessage('請填入信箱格式', email),
  },
  userName: {
    required: helpers.withMessage('此欄位為必填', required),
    minLength: helpers.withMessage('長度須超過3個字元', minLength(3)),
  },
  password: {
    required: helpers.withMessage('此欄位為必填', required),
    minLength: helpers.withMessage('長度須超過8個字元', minLength(8)),
  },
  passwordCheck: {
    required: helpers.withMessage('此欄位為必填', required),
  },
};

const v$ = useVuelidate(registerRules, registerData);

const showDialog = (title, message) => {
  dialogMessage.value = message;
  dialogTitle.value = title;
  showMessageDialog.value = true;
};
  // 註冊
const handleSubmit = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  const result = await store.dispatch('registerUser', registerData.value);
  if (result.status === 200) {
    showDialog('註冊成功', '請重新登入帳號');
    isRegisterMode.value = false;
  } else {
    showDialog('註冊失敗', '此信箱或使用者名稱已存在');
  }
};

// 登入
const handleLogin = async () => {
  const result = await store.dispatch('loginUser', loginData.value);
  if (result.status === 200) {
    router.push('/');
  } else {
    showDialog('登入失敗', '請檢查此信箱是否存在');
  }
};

const handleRegister = () => {
  isRegisterMode.value = !isRegisterMode.value;
};

const onBeforeEnter = (el) => {
  const element = el;
  element.style.transform = 'translateX(100%)';
};
const onEnter = (el, done) => {
  const element = el;
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight;
  element.style.transition = 'transform 0.5s';
  element.style.transform = 'translateX(0)';
  done();
};

const onLeave = (el, done) => {
  const element = el;
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight;
  element.style.transition = 'transform 0.5s';
  element.style.transform = 'translateX(-100%)';
  done();
};

/* Validate 相關Message */
const emailErrorMsg = computed(() => {
  const errors = [];
  v$.value.email.$errors.forEach((error) => {
    errors.push(error.$message);
  });
  return errors;
});

const passwordErrorMsg = computed(() => {
  const errors = [];
  v$.value.password.$errors.forEach((error) => {
    errors.push(error.$message);
  });
  return errors;
});

const passwordCheckErrorMsg = computed(() => {
  const errors = [];
  v$.value.passwordCheck.$errors.forEach((error) => {
    errors.push(error.$message);
  });
  return errors;
});

const userNameErrorMsg = computed(() => {
  const errors = [];
  v$.value.userName.$errors.forEach((error) => {
    errors.push(error.$message);
  });
  return errors;
});

// 設定測試資料
const setTestData = () => {
  if (isRegisterMode.value) {
    registerData.value = {
      email: 'test@gmail.com',
      userName: 'Test',
      password: '12345678',
      passwordCheck: '12345678',
    };
  } else {
    loginData.value = {
      email: 'test@gmail.com',
      password: '12345678',
    };
  }
};

</script>
  <style scoped>
  .v-text-field {
    width: 300px;
    margin-top: 10px;
  }
  .login-container{
    background: white url(../assets/logos/calories.png) center top ;
    width: 100%;
    height: 100%;
  }
  </style>
