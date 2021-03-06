import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TableDoctor from '../components/tableDoctor/tableDoctor.vue'
import TablePatient from '../components/tablePatient/tablePatient.vue'
import TableRoom from '../components/tableRoom/tableRoom.vue'
import TableDate from '../components/tableDate/tableDate.vue'
import TableIncome from '../components/tableIncome/tableIncome.vue'
import TableAlta from '../components/tableAlta/tableAlta.vue'





Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component:TableDoctor
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/patient',
    name: 'Patient',
    component:TablePatient
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },

  {
    path: '/room',
    name: 'Room',
    component:TableRoom
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   },
   
  {
    path: '/date',
    name: 'Date',
    component:TableDate
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   }
   ,
   {
    path: '/income',
    name: 'Income',
    component:TableIncome
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   }
   ,  {
    path: '/alta',
    name: 'Alta',
    component:TableAlta
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
