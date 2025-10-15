<template>
  <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <!-- 弹窗头部 -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">创建新文章</h3>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6 overflow-y-auto">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 文章标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              文章标题 <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="请输入文章标题"
            >
          </div>
          
          <!-- 文章标签 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              文章标签
            </label>
            <input
              v-model="formData.tags"
              type="text"
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="请输入标签，多个标签用逗号分隔"
            >
          </div>
          
          <!-- 文章状态 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              文章状态
            </label>
            <select
              v-model="formData.status"
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
              <option value="archived">已归档</option>
            </select>
          </div>
          
          <!-- Markdown 文件上传 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Markdown 文件上传 <span class="text-red-500">*</span>
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <i class="fas fa-file-upload text-3xl text-gray-400"></i>
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label for="file-upload" class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>上传文件</span>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept=".md,.markdown" 
                      @change="handleFileUpload"
                      class="sr-only"
                      required
                    >
                  </label>
                  <p class="pl-1">或拖拽文件到这里</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  仅支持 .md 或 .markdown 格式的文件
                </p>
                <p v-if="uploadedFileName" class="text-sm text-green-600 dark:text-green-400">
                  已选择文件: {{ uploadedFileName }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- 文件预览（可选） -->
          <div v-if="fileContentPreview" class="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文件内容预览（前200字符）
            </label>
            <div class="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded border max-h-32 overflow-y-auto">
              {{ fileContentPreview }}
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                创建中...
              </span>
              <span v-else>
                <i class="fas fa-plus mr-2"></i>
                创建文章
              </span>
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

// 定义事件
const emit = defineEmits<{
  close: []
  success: []
}>()

// 表单数据
const formData = reactive({
  title: '',
  tags: '',
  status: 'draft',
  file: null as File | null
})

// 状态管理
const isSubmitting = ref(false)
const uploadedFileName = ref('')
const fileContentPreview = ref('')

/**
 * 处理文件上传
 */
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0] as File
    
    // 检查文件类型
    if (!file.name.toLowerCase().endsWith('.md') && !file.name.toLowerCase().endsWith('.markdown')) {
      alert('请上传 Markdown 文件 (.md 或 .markdown 格式)')
      target.value = ''
      return
    }
    
    // 检查文件大小（限制为 10MB）
    if (file.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过 10MB')
      target.value = ''
      return
    }
    
    formData.file = file
    uploadedFileName.value = file.name
    
    // 预览文件内容（前200字符）
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      fileContentPreview.value = content.substring(0, 200) + (content.length > 200 ? '...' : '')
    }
    reader.readAsText(file)
  }
}

/**
 * 处理表单提交
 */
const handleSubmit = async () => {
  // 表单验证
  if (!formData.title.trim()) {
    alert('请输入文章标题')
    return
  }
  
  if (!formData.file) {
    alert('请选择要上传的 Markdown 文件')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 创建 FormData 对象
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('tags', formData.tags)
    formDataToSend.append('status', formData.status)
    formDataToSend.append('file', formData.file)
    
    // 发送创建请求
    const response = await axios.post('/api/posts', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.code === 201) {
      alert('文章创建成功！')
      emit('success')
      emit('close')
    } else {
      throw new Error(response.data.message || '创建失败')
    }
    
  } catch (error) {
    console.error('创建文章失败:', error)
    if (error instanceof Error) {
      alert('创建文章失败: ' + error.message)
    } else {
      alert('创建文章失败: 网络错误')
    }
  } finally {
    isSubmitting.value = false
  }
}

/**
 * 重置表单
 */
const resetForm = () => {
  formData.title = ''
  formData.tags = ''
  formData.status = 'draft'
  formData.file = null
  uploadedFileName.value = ''
  fileContentPreview.value = ''
}

// 监听弹窗关闭事件，重置表单
const handleClose = () => {
  resetForm()
  emit('close')
}
</script>