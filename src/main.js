import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入计算器的ui库
import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(Vant)
    .mount('#app')
