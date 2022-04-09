import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loader from "@/components/common/Loader";
import { Formatter } from "@/plugins";
import Notifications from "@kyvg/vue3-notification"
import Maska from "maska"

import 'animate.css'

import './assets/styles/grid.min.css'
import './assets/styles/style.scss'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "http://crmka/";

} else {
    axios.defaults.baseURL = "http://api.billypro.beget.tech/";
}
const app = createApp(App);
app.config.devtools = true;
app.component('Loader', Loader).use(Notifications).use(Maska).use(Formatter).use(VueAxios, axios).use(store).use(router).mount('#app');