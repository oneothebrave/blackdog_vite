<template>
  <div class="p-d-inline-flex login-box">
    <div class="p-grid p-flex-column">
      <div class="p-text-center app-name p-text-italic p-col">BlackDog</div>
      <div class="p-col">
        <span class="p-float-label p-input-icon-right">
          <!-- 转转的圈 -->
          <i
            class="pi pi-spin pi-spinner"
            v-if="email.length && !showPasswordInput && !invalidUser"
          />
          <InputText
            id="email"
            class="p-inputtext-lg"
            :class="{ 'p-invalid': invalidUser }"
            type="text"
            v-model="email"
            @keydown="handleUsername"
          />
          <label for="email">邮箱</label>
        </span>
      </div>

      <div class="p-col" v-if="showPasswordInput">
        <span class="p-float-label p-input-icon-right">
          <InputText
            id="password"
            class="p-inputtext-lg"
            :class="{ 'p-invalid': invalidPassword }"
            type="password"
            v-model="password"
            @keydown="handlePassword"
            v-focus
          />
          <label for="password">密码</label>
        </span>
      </div>
      <div class="p-col">
        <Button
          class="login-btn p-ripple"
          :disabled="!Boolean(password.length)"
          label="登录"
          @click="handleLogin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, inject, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router"; // 在 composition api中使用useRouter或useRoute来设置路由 取代option api中的this.$route....
import axios from "axios";
export default {
  setup() {
    // const { ctx } = getCurrentInstance(); // 替代vue2中的this
    document.querySelector('html').setAttribute('style', 'background: url("/static/bd.jpg"); background-size: cover');
    onBeforeUnmount(()=>{
      document.querySelector('html').setAttribute('style', 'background: var(--surface-b)');
    });
    const email = ref("");
    const showPasswordInput = ref(false);
    const password = ref("");
    const invalidUser = ref(false);
    const invalidPassword = ref(false);
    const router = useRouter();
    const checkUserExist = () => {
      // 检查是否存在该用户
      axios
        .get("/api/user/userExist", {
          params: {
            email: email.value
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.length) {
            showPasswordInput.value = !showPasswordInput.value;
            invalidUser.value = false;
            invalidPassword.value = false;
            clearTimeout(user_exist_timer);
          } else {
            showPasswordInput.value = false;
            password.value = "";
            user_exist_timer = setTimeout(curUserNonentity, 2000);
          }
        });
    };
    const curUserNonentity = () => {
      invalidUser.value = true;
    };
    let find_user_timer; // 用户暂时停止输入了 就假设用户确定已经输入的就是他的账号  开始验证是否有该账号
    let user_exist_timer; //  已验证没有该账号  用户还是没有增加输入  时间一到 提示账号不存在
    const handleUsername = () => {
      if (invalidUser.value) {
        invalidUser.value = false;
      }
      if (find_user_timer) {
        clearTimeout(find_user_timer);
      }
      if (user_exist_timer) {
        clearTimeout(user_exist_timer);
      }
      find_user_timer = setTimeout(checkUserExist, 1000);
    };
    const handlePassword = () => {
      if (invalidPassword.value) {
        invalidPassword.value = !invalidPassword.value;
      }
    };
    const handleLogin = function () {
      const response = axios
        .get("/api/user/login", {
          params: {
            username: username.value,
            password: password.value,
          },
        })
        .then((response) => {
          const data = response.data
          if (data.length) {
            // 路由跳转页面的同时携带参数
            router.push({ 
              name: "User", 
              params: {
                "username": data[0]["username"],
                "description": data[0]["description"]
              }
            });
          } else {
            invalidPassword.value = true;
          }
        });
      // if (username.value === 'oneo' && password.value == '123'){
      //   router.push({name: 'Index'})
      // }else{
      //   invalidPassword.value = true
      // }
    };
    return {
      email,
      showPasswordInput,
      password,
      handleUsername,
      handlePassword,
      invalidUser,
      invalidPassword,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-box {
  padding: 3rem 2rem;
  margin-top: 5rem;
  border: 1px solid #dedede;
  border-radius: 2px;
}
.app-name {
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
}
.login-btn {
  width: 100%;
}
</style>