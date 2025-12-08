import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

pinia.use(SecretPiniaPlugin)

function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

app.use(pinia)

app.mount('#app')