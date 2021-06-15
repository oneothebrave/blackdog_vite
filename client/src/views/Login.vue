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
            @keydown="handleEmail"
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
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router"; // 在 composition api中使用useRouter或useRoute来设置路由 取代option api中的this.$route....
import axios from "axios";
import {setCookie} from "../composable/js/cookieHandler.js"
export default {
  setup() {
    // const { ctx } = getCurrentInstance(); // 替代vue2中的this
    // 登录界面背景用bd.jpg，切换到其他界面要换背景为纯色
    document.querySelector('html').setAttribute('style', 'background: url("/static/bd.jpg"); background-size: cover');
    onBeforeUnmount(()=>{
      document.querySelector('html').setAttribute('style', 'background: #181818');
    });

    const email = ref("");  // 邮箱输入框
    const showPasswordInput = ref(false); // boolean 是否显示密码输入框
    const password = ref(""); // 密码输入框
    const invalidUser = ref(false); // 账户无效框变红
    const invalidPassword = ref(false);  // 密码无效框变红
    const router = useRouter();

    const checkUserExist = () => {
      // 检查是否存在该用户
      axios
        .post("/api/user/userExist", {
            email: email.value
        })
        .then((response) => {
          showPasswordInput.value = !showPasswordInput.value;
          invalidUser.value = false;
          invalidPassword.value = false;
          clearTimeout(user_exist_timer);
        })
        .catch((err) => {
          showPasswordInput.value = false;
          password.value = "";
          user_exist_timer = setTimeout(() => {
            invalidUser.value = true;
          }, 2000);
          console.log(err)
        })
    };
    let find_user_timer; // 用户暂时停止输入了 就假设用户确定已经输入的就是他的账号  开始验证是否有该账号
    let user_exist_timer; //  已验证没有该账号  用户还是没有增加输入  时间一到 提示账号不存在
    const handleEmail = () => {
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
    const handleLogin = () => {
      axios
        .post("/api/user/login", {
            email: email.value,
            password: password.value,
        })
        .then((response) => {
            // 将token保存进localStorage中
            localStorage["auth-token"] = response.data["auth-token"];
            // 将username和email保存进cookie中
            setCookie("email", response.data["email"]);
            setCookie("username", response.data["username"]);
            // 路由跳转页面的同时携带参数
            router.push({ 
              name: "Index", 
              // params: {
              //   "username": data[0]["username"]
              // }
            });
        })
        .catch((err) => {
          invalidPassword.value = true;
          console.log(err)
        });
    };
    return {
      email,
      showPasswordInput,
      password,
      handleEmail,
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