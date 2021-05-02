import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

// css
import "./composable/css/index.css" ;
import 'primeflex/primeflex.css';
import "primevue/resources/themes/fluent-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// 导入PrimeVue的组件
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';


const app = createApp(App);
// app.config.globalProperties.axios = axios;  // 全局注册axios
app
    .use(router)



// 注册 PrimeVue的组件
app.component('InputText', InputText);
app.component('Button', Button);


app.mount('#app');
