import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

let app = createApp(App)
app.use(ToastPlugin)

app.use(router).mount('#app')
