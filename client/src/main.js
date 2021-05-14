import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import PrimeVue from 'primevue/config'

// css
import "./composable/css/index.css" ;
import 'primeflex/primeflex.css';
import "primevue/resources/themes/fluent-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

//js
// import {setCookie, getCookie, delCookie} from "./composable/js/cookieHandler.js"

// 导入PrimeVue的组件
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import TieredMenu from 'primevue/tieredmenu';
import ScrollPanel from 'primevue/scrollpanel';
import Dialog from 'primevue/dialog';
import Chips from 'primevue/chips';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Galleria from 'primevue/galleria';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


const app = createApp(App);
// app.config.globalProperties.axios = axios;  // 全局注册axios
app
    .use(router)
    .use(PrimeVue, {ripple: true})

//自定义指令集
    // v-focus
import d_focus from "./composable/js/directive-focus.js"
app.directive("focus", d_focus);
    // v-lazyload
import d_lazyload from "./composable/js/directive-lazyload.js"
app.directive("lazyload", d_lazyload);


// 注册 PrimeVue的组件
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Panel', Panel);
app.component('TieredMenu', TieredMenu);
app.component('ScrollPanel', ScrollPanel);
app.component('Dialog', Dialog);
app.component('Chips', Chips);
app.component('FileUpload', FileUpload);
app.component('Textarea', Textarea);
app.component('Galleria', Galleria);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);


app.mount('#app');
