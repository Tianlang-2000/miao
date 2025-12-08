import { createRouter, createWebHashHistory } from 'vue-router'
import BuyerView from '../views/BuyerView.vue'
import SellerView from '../views/SellerView.vue'
import BuyedView from '../views/BuyedView.vue'
import ShouhouView from '../views/ShouhouView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: BuyerView,
      children: [
        {
          path: 'Buyed',
          component: BuyedView
        },
        {
          path: 'shouhou',
          component: ShouhouView
        }
      ]
    }
  ],
})

export default router
