import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css'
// import router from "@/router/router"

// Vue.config.productionTip = false

new Vue({
    el: "#app",
    // 启用路由表
    // router,
  render: h => h(App),
}).$mount('#app')
