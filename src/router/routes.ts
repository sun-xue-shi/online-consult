const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/notify',
        component: () => import('@/views/notify/index.vue'),
        meta: {
          title: '消息中心'
        }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '我的'
        }
      },
      {
        path: '/article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '健康百科'
        }
      }
    ]
  },
  {
    path: '/user/patient',
    component: () => import('@/views/user/PatientPage.vue'),
    meta: {
      title: '家庭档案'
    }
  },
  {
    path: '/user/consult',
    component: () => import('@/views/user/ConsultPage.vue'),
    meta: {
      title: '我的问诊'
    }
  },
  {
    path: '/consult/fast',
    component: () => import('@/views/consult/ConsultFast.vue'),
    meta: {
      title: '快速问诊'
    }
  },
  {
    path: '/consult/dep',
    component: () => import('@/views/consult/ConsultDep.vue'),
    meta: {
      title: '科室选择'
    }
  },
  {
    path: '/consult/illness',
    component: () => import('@/views/consult/ConsultIllness.vue'),
    meta: {
      title: '病情描述'
    }
  },
  {
    path: '/consult/pay',
    component: () => import('@/views/consult/ConsultPay.vue'),
    meta: {
      title: '订单支付'
    }
  },
  {
    path: '/room',
    component: () => import('@/views/room/index.vue'),
    meta: {
      title: '问诊室'
    }
  }
]

export default routes
