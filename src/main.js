// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCodeMirror from 'vue-codemirror'
import App from './App'
import router from './router'
import store from './vuex/store'

import 'normalize.css'
Vue.use(VueCodeMirror)
import './reset/reset-codemirror.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store: store,
    template: '<App/>',
    components: { App }
})
