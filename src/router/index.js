import Vue from 'vue'
import Router from 'vue-router'
import Katapult from '@/components/Katapult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Katapult',
      component: Katapult
    }
  ]
})
