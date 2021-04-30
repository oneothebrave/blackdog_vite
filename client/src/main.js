import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

// css
import "./composable/css/index.css" 

const app = createApp(App);

app
    .use(router);






app.mount('#app');
