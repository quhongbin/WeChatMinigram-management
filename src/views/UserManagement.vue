<template>
    <div>
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">用户管理</h1>
        <button 
          @click="showAddUser = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <i class="fas fa-plus mr-2"></i>
          添加用户
        </button>
      </div>
      
      <!-- 用户筛选 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
            <input 
              v-model="searchText" 
              type="text" 
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入用户名搜索"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">状态</label>
            <select 
              v-model="selectedStatus" 
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部</option>
              <option value="active">活跃</option>
              <option value="inactive">非活跃</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">角色</label>
            <select 
              v-model="selectedRole" 
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部</option>
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
              <option value="viewer">查看者</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="filterUsers"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              搜索
            </button>
          </div>
        </div>
    </div>
      
      <!-- 用户表格 -->
      <UserTable :users="filteredUsers" />
      
      <!-- 添加用户弹窗 -->
      <UserManagementAddUser 
        v-if="showAddUser"
        @close="showAddUser = false"
        @success="handleUserAdded"
      />
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import UserTable from '../views/UserTable.vue'
import UserManagementAddUser from './UserManagementAddUser.vue'

const name = 'UserManagement'

// 用户数据
import {type FilteredUser} from '../types/UserTypes'
const FetchedUsers = ref<FilteredUser[]>([])  

// 筛选条件
const searchText = ref('')
const selectedStatus = ref('')
const selectedRole = ref('')

// 显示添加用户弹窗
const showAddUser = ref(false)

// 筛选后的用户数据
const filteredUsers = computed(() => {
  return FetchedUsers.value.filter((user:FilteredUser) => {
    // 用户名筛选
    const matchesText = !searchText.value || 
      (user.username && user.username.toLowerCase().includes(searchText.value.toLowerCase()))
    
    // 状态筛选
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
    
    // 角色筛选
    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    
    return matchesText && matchesStatus && matchesRole
  })
})

/**
 * @description: 获取所有用户
 * @return {*}
 */
async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3000/api/users');
    FetchedUsers.value = response.data.data
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error instanceof Error) {
      alert('Error fetching users:' + error.message);
    } else {
      alert('Error fetching users: An unknown error occurred');
    }
  }
}
/**
 * @description: 根据ID获取用户
 * @param {*} id
 * @return {*}
 */
async function getUserById(id:number) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    FetchedUsers.value = response.data.data
  } catch (error) {
   console.error('Error deleting user:', error);
    if (error instanceof Error) {
      alert('Error deleting user by id:' + error.message);
    } else {
      alert('Error fetching user by id: An unknown error occurred');
    }
  }
}

/**
 * @description: 根据ID删除用户
 * @param {*} id
 * @return {*}
 */
async function delUserById(id:number) {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    FetchedUsers.value = response.data.data
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error) {
      alert('Error deleting user by id:' + error.message);
    } else {
      alert('Error deleting user by id: An unknown error occurred');
    }
  }
}

/**
 * @description: 创建用户
 * @param {*} user
 * @return {*}
 */
async function createUser(user:object) {
  try {
    const response = await axios.post('/api/users', user);
    alert(response.data.message)
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      alert('Error creating user:' + error.message);
    } else {
      alert('Error creating user: An unknown error occurred');
    }
  }
}

/**
 * @description: 处理用户添加成功后的回调
 * @return {*}
 */
function handleUserAdded() {
  // 重新获取用户列表
  getUsers()
}

/**
 * @description: 筛选用户函数
 * @return {*}
 */
function filterUsers() {
  // 由于使用了computed属性，filteredUsers会自动更新
  // 这里可以添加一些额外的逻辑，比如重置筛选条件等
  console.log('筛选条件:', {
    searchText: searchText.value,
    selectedStatus: selectedStatus.value,
    selectedRole: selectedRole.value
  })
}

onMounted(()=>{
  getUsers()
})
</script>