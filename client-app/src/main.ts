import { router } from './router/index';
import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'

import './styles/tailwind.css'

createApp(App).use(store).use(router).mount('#app')
