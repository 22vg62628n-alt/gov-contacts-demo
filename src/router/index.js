import { createRouter, createWebHashHistory } from 'vue-router'
import { hasAnyRole } from '../utils/authStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/ProjectHome.vue')
  },
  {
    path: '/dept/org',
    name: 'DeptTree',
    component: () => import('../views/dept/DeptList.vue')
  },
  {
    path: '/contacts/organization',
    name: 'ContactsOrg',
    component: () => import('../views/dept/DeptList.vue')
  },
  {
    path: '/departments/:id',
    name: 'DeptDetail',
    component: () => import('../views/dept/DeptDetail.vue')
  },
  {
    path: '/persons',
    name: 'PersonList',
    component: () => import('../views/person/PersonList.vue')
  },
  {
    path: '/persons/add',
    name: 'PersonAdd',
    component: () => import('../views/person/PersonForm.vue')
  },
  {
    path: '/persons/:id',
    name: 'PersonDetail',
    component: () => import('../views/person/PersonDetail.vue')
  },
  {
    path: '/persons/:id/edit',
    name: 'PersonEdit',
    component: () => import('../views/person/PersonForm.vue')
  },
  {
    path: '/approval-center',
    name: 'ApprovalCenter',
    component: () => import('../views/workflow/ApprovalCenter.vue'),
    meta: { roles: ['platform_admin', 'org_admin'] }
  },
  {
    path: '/external-people',
    name: 'ExternalPeopleManage',
    component: () => import('../views/person/ExternalPeopleManage.vue'),
    meta: { roles: ['platform_admin', 'org_admin'] }
  },
  {
    path: '/special-org-reminder',
    name: 'SpecialOrgReminder',
    component: () => import('../views/org/SpecialOrgReminder.vue'),
    meta: { roles: ['platform_admin', 'org_admin'] }
  },
  {
    path: '/line-contacts',
    name: 'LineContacts',
    component: () => import('../views/line/LineContacts.vue')
  },
  {
    path: '/line-contacts-manage',
    name: 'LineContactManage',
    component: () => import('../views/line/LineContactManage.vue')
  },
  {
    path: '/area-codes',
    name: 'AreaCodeList',
    component: () => import('../views/code/AreaCodeList.vue')
  },
  {
    path: '/line-codes',
    name: 'LineCodeList',
    component: () => import('../views/code/LineCodeList.vue')
  },
  {
    path: '/visibility',
    name: 'VisibilityConfig',
    component: () => import('../views/settings/VisibilityConfig.vue')
  },
  {
    path: '/display-settings',
    name: 'DisplaySettings',
    component: () => import('../views/settings/DisplaySettings.vue')
  },
  {
    path: '/custom-fields',
    name: 'CustomFields',
    component: () => import('../views/settings/CustomFields.vue')
  },
  {
    path: '/mobile-business-card',
    name: 'MobileBusinessCard',
    component: () => import('../views/mobile/MobileBusinessCard.vue')
  },
  // Old paths kept for compatibility with legacy entry links.
  {
    path: '/code/line-address',
    redirect: '/line-contacts'
  },
  {
    path: '/settings/visibility',
    redirect: '/visibility'
  },
  {
    path: '/person/manage',
    redirect: '/persons'
  },
  {
    path: '/departments',
    redirect: '/dept/org'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const allowRoles = to.meta?.roles || []
  if (!hasAnyRole(allowRoles)) {
    next('/persons')
    return
  }
  next()
})

export default router
