import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dataUpdate from '../views/sys-admin/temp/DataUpdateView.vue'
import overtimeUpdate from '../views/sys-admin/temp/OvertimeUpdateView.vue'
import absenceTrackerUpdate from '../views/sys-admin/temp/AbsenceTrackerUpdateView.vue'
import { Message } from 'element-ui'
Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        meta: { requiresAuth: true },
        component: HomeView,

        children: [
            {
                path: '/sys-erp/enterprise/salaryManagement/add-new',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/SalaryManagementListView.vue')
            },
            {
                path: '/sys-erp/enterprise/data/add-new',
                component: () => import('../views/sys-admin/temp/DataAddNewView.vue'),
            },
            {
                path: '/sys-erp/enterprise/data/quitdateList',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/DataQuitdateListView.vue')
            },
            {
                path: '/sys-erp/enterprise/data/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/DataListView.vue')
            },
            {
                // path: '/sys-erp/enterprise/data/update',
                // component: () => import('../views/sys-admin/temp/DataUpdateView.vue')
                path: "/sys-erp/enterprise/data/update",
                name: "dataUpdate",
                component: dataUpdate,
                meta: { requiresAuth: true },
                props: (route) => route.params
            },
            {
                path: '/sys-erp/enterprise/dept/add-new',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/DeptAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/dept/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/DeptListView.vue')
            },
            {
                path: '/sys-erp/enterprise/position/add-new',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/PositionAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/admin/add-new',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/AdminAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/admin/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/AdminListView.vue')
            }
            ,
            {
                path: '/sys-erp/enterprise/bank/add-New',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/BankAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/bank/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/BandListView.vue')
            },
            {
                path: '/sys-erp/enterprise/overtime/add-New',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/OvertimeAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/overtime/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/OvertimeListView.vue')
            },
            {
                // path: '/sys-erp/enterprise/data/update',
                // component: () => import('../views/sys-admin/temp/DataUpdateView.vue')
                path: "/sys-erp/enterprise/overtime/update",
                meta: { requiresAuth: true },
                name: "overtimeUpdate",
                component: overtimeUpdate,
                props: (route) => route.params
            },
            {
                path: '/sys-erp/enterprise/absenceTracker/data-new',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/AbsenceTrackerAddNewView.vue')
            },
            {
                path: '/sys-erp/enterprise/absenceTracker/list',
                meta: { requiresAuth: true },
                component: () => import('../views/sys-admin/temp/AbsenceTrackerListView.vue')
            },
            {
                // path: '/sys-erp/enterprise/data/update',
                // component: () => import('../views/sys-admin/temp/DataUpdateView.vue')
                path: "/sys-erp/enterprise/absenceTracker/update",
                name: "absenceTrackerUpdate",
                meta: { requiresAuth: true },
                component: absenceTrackerUpdate,
                props: (route) => route.params
            },
            {
                path: '/temporaryPage',
                meta: { requiresAuth: true },
                component: () => import('../views/TemporaryPageView.vue'),
            },
            {
                path: '/logOut',
                component: () => import('../views/LogOutView.vue'),
            },
            {
                path: '/AccountInfo',
                component: () => import('../views/sys-admin/temp/AccountInfoView.vue'),
            }
        ]
    },
    {
        path: '/about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/login',
        component: () => import('../views/LoginView.vue'),
    },

]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    },
)

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = localStorage.getItem('jwt')
    if (to.name === 'login') {
        next()
    } else if (requiresAuth && !currentUser) {
        Message.warning('請先登入')
        next('/login')

    } else {
        next()
    }
})

export default router
