import { createRouter, createWebHistory } from 'vue-router'

// 导入视图组件
import Dashboard from './views/Dashboard.vue'
import UserManagement from './views/UserManagement.vue'
import PostsManagement from './views/PostsManagement.vue'
// import ProductManagement from './views/ProductManagement.vue'
import DataAnalysis from './views/DataAnalysis.vue'
import MessageCenter from './views/MessageCenter.vue'
import SystemSettings from './views/SystemSettings.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    path: '/posts',
    name: 'PostsManagement',
    component: PostsManagement
  },
  {
    path: '/analytics',
    name: 'DataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/messages',
    name: 'MessageCenter',
    component: MessageCenter
  },
  {
    path: '/settings',
    name: 'SystemSettings',
    component: SystemSettings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router