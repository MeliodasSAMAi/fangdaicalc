import {createRouter, createMemoryHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: '房贷计算器',
        redirect: '/land',
        component: () => import('../views/calc/Calc'),
        children: [
            {
                path: 'land',
                component: () => import('../views/calc/Loan')
            },
        ]
    },
    {
        path: '/custom',
        name: '自定义利率页面',
        component: () => import('../views/custom/Contain'),
        children: [
            {
                path: 'sy',
                component: () => import('../views/custom/SyDk')
            },
            {
                path: 'gjj',
                component: () => import('../views/custom/GjjDk')
            },
        ]
    },
    {
        path: '/result',
        component: () => import('../views/result/Result')
    },
    {
        path: '/detail',
        component: () => import('../views/detail/Detail')
    },
    {
        path: '/detail/zh/:id',
        component: () => import('../views/detail/组合贷款/Detail')
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
