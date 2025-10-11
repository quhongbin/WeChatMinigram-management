<template>
    <div>
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">用户管理</h1>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <i class="fas fa-plus mr-2"></i>
          添加用户
        </button>
      </div>
      
      <!-- 用户筛选 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
            <input type="text" class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">状态</label>
            <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">全部</option>
              <option value="active">活跃</option>
              <option value="inactive">非活跃</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">角色</label>
            <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">全部</option>
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
              <option value="viewer">查看者</option>
            </select>
          </div>
          <div class="flex items-end">
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              搜索
            </button>
          </div>
        </div>
      </div>
      
      <!-- 用户表格 -->
      <UserTable :users="users" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import UserTable from '../components/UserTable.vue'
  
  export default {
    name: 'UserManagement',
    components: {
      UserTable
    },
    setup() {
      // 用户数据
      const users = ref([
        { id: 1, name: '张三', email: 'zhangsan@example.com', status: '活跃', role: '管理员', lastLogin: '2023-07-20 14:30' },
        { id: 2, name: '李四', email: 'lisi@example.com', status: '活跃', role: '编辑', lastLogin: '2023-07-19 10:15' },
        { id: 3, name: '王五', email: 'wangwu@example.com', status: '非活跃', role: '查看者', lastLogin: '2023-07-15 16:45' },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: '活跃', role: '编辑', lastLogin: '2023-07-20 09:20' },
        { id: 5, name: '钱七', email: 'qianqi@example.com', status: '活跃', role: '管理员', lastLogin: '2023-07-18 11:30' },
      ])
      
      return {
        users
      }
    }
  }
  </script>