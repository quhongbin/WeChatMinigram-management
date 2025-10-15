<template>
  <div class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <!-- 头部 -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">添加用户</h2>
      </div>
      
      <!-- 表单内容 -->
      <div class="px-6 py-4">
        <form @submit.prevent="handleSubmit">
          <!-- 名字 -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名字 <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入用户姓名"
            />
          </div>
          
          <!-- 邮箱 -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              邮箱 <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱地址"
            />
          </div>
          
          <!-- 状态 -->
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              状态 <span class="text-red-500">*</span>
            </label>
            <select
              id="status"
              v-model="formData.status"
              required
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择状态</option>
              <option value="active">活跃</option>
              <option value="inactive">非活跃</option>
            </select>
          </div>
          
          <!-- 角色 -->
          <div class="mb-6">
            <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              角色 <span class="text-red-500">*</span>
            </label>
            <select
              id="role"
              v-model="formData.role"
              required
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择角色</option>
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
              <option value="viewer">查看者</option>
            </select>
          </div>
          
          <!-- 按钮组 -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="handleCancel"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors flex items-center"
            >
              <span v-if="loading" class="animate-spin mr-2">
                <i class="fas fa-spinner"></i>
              </span>
              {{ loading ? '添加中...' : '添加用户' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'

// 定义组件属性
interface Props {
  onClose?: () => void
  onSuccess?: () => void
}

const props = defineProps<Props>()

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  status: '',
  role: ''
})

// 加载状态
const loading = ref(false)

/**
 * 处理表单提交
 */
const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.status || !formData.role) {
    alert('请填写所有必填字段')
    return
  }

  loading.value = true

  try {
    const response = await axios.post('http://localhost:3000/api/users', formData)
    
    if (response.data.success) {
      // 显示成功消息
      alert('用户添加成功')
      
      // 调用成功回调
      if (props.onSuccess) {
        props.onSuccess()
      }
      
      // 关闭弹窗
      handleClose()
    } else {
      alert('添加用户失败：' + response.data.message)
    }
  } catch (error: any) {
    console.error('Error creating user:', error)
    alert('添加用户失败：' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

/**
 * 处理取消操作
 */
const handleCancel = () => {
  handleClose()
}

/**
 * 关闭弹窗
 */
const handleClose = () => {
  if (props.onClose) {
    props.onClose()
  }
}
</script>

<style scoped>
/* 自定义样式 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>