import Vue from 'vue'
import Router from 'vue-router'
import Index      from '@/components/Index.vue'
import Kitchen    from '@/components/kitchen/Kitchen.vue'
import K10        from '@/components/kitchen/K10.vue'
import K11        from '@/components/kitchen/K11.vue'
import K12        from '@/components/kitchen/K12.vue'
import K20        from '@/components/kitchen/K20.vue'
import Bathroom   from '@/components/bathroom/Bathroom.vue'
import BA10       from '@/components/bathroom/BA10.vue'
import LivingRoom from '@/components/living-room/LivingRoom.vue'
import L10        from '@/components/living-room/L10.vue'
import L11        from '@/components/living-room/L11.vue'
import L12        from '@/components/living-room/L12.vue'
import L121       from '@/components/living-room/L121.vue'
import L122       from '@/components/living-room/L122.vue'
import L123       from '@/components/living-room/L123.vue'
import L13        from '@/components/living-room/L13.vue'
import L14        from '@/components/living-room/L14.vue'
import L15        from '@/components/living-room/L15.vue'
import L20        from '@/components/living-room/L20.vue'
import Bedroom    from '@/components/bedroom/Bedroom.vue'
import BE10       from '@/components/bedroom/BE10.vue'
import BE20       from '@/components/bedroom/BE20.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      component: Kitchen
    },
    {
      path: '/kitchen/K10',
      name: 'K10',
      component: K10
    },
    {
      path: '/kitchen/K11',
      name: 'K11',
      component: K11
    },
    {
      path: '/kitchen/K12',
      name: 'K12',
      component: K12
    },
    {
      path: '/kitchen/K20',
      name: 'K20',
      component: K20
    },
    {
      path: '/bathroom',
      name: 'bathroom',
      component: Bathroom
    },
    {
      path: '/bathroom/BA10',
      name: 'BA10',
      component: BA10
    },
    {
      path: '/living-room',
      name: 'living-room',
      component: LivingRoom
    },
    {
      path: '/living-room/L10',
      name: 'L10',
      component: L10
    },
    {
      path: '/living-room/L11',
      name: 'L11',
      component: L11
    },
    {
      path: '/living-room/L12',
      name: 'L12',
      component: L12
    },
    {
      path: '/living-room/L121',
      name: 'L121',
      component: L121
    },
    {
      path: '/living-room/L122',
      name: 'L122',
      component: L122
    },
    {
      path: '/living-room/L123',
      name: 'L123',
      component: L123
    },
    {
      path: '/living-room/L13',
      name: 'L13',
      component: L13
    },
    {
      path: '/living-room/L14',
      name: 'L14',
      component: L14
    },
    {
      path: '/living-room/L15',
      name: 'L15',
      component: L15
    },
    {
      path: '/living-room/L20',
      name: 'L20',
      component: L20
    },
    {
      path: '/bedroom',
      name: 'bedroom',
      component: Bedroom
    },
    {
      path: '/bedroom/BE10',
      name: 'BE10',
      component: BE10
    },
    {
      path: '/bedroom/BE20',
      name: 'BE20',
      component: BE20
    }
  ]
})
