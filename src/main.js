// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import Vue from 'vue';
import VueTyperPlugin from 'vue-typer'
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false

// Vue.use(new VueSocketIO({
//     debug: true,
//     secure: true,
//     connection: 'http://192.168.178.164:8081',
// }))

Vue.use(VueTyperPlugin)

 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// Vue.use(VueSocketio, socketio('http://10.10.0.180:8081'));