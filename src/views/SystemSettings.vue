<template>
    <div>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">系统设置</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 设置菜单 -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-600">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white">设置分类</h2>
            </div>
            <div class="divide-y divide-gray-200 dark:divide-gray-600">
              <div v-for="item in settingsMenu" :key="item.id" 
                :class="['p-4 cursor-pointer', 
                activeSetting === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : 
                'hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300']"
                @click="activeSetting = item.id">
                <div class="flex items-center">
                  <i :class="[item.icon, 'mr-3']"></i>
                  <span class="font-medium">{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 设置内容 -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <div v-if="activeSetting === 1">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">基本设置</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">系统名称</label>
                  <input type="text" class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="AdminPro">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">系统描述</label>
                  <textarea class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3">一个功能强大的后台管理系统</textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">时区设置</label>
                  <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>GMT+8 中国标准时间</option>
                    <option>GMT+0 格林威治标准时间</option>
                    <option>GMT-5 美国东部时间</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="maintenance" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="maintenance" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用维护模式</label>
                </div>
              </div>
            </div>
            
            <div v-else-if="activeSetting === 2">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">安全设置</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码策略</label>
                  <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>中等强度 - 至少8位字符</option>
                    <option>高强度 - 至少12位字符，包含数字和特殊字符</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="twoFactor" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked>
                  <label for="twoFactor" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用双因素认证</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="sessionTimeout" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked>
                  <label for="sessionTimeout" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">会话超时自动退出</label>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">会话超时时间</label>
                  <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>30分钟</option>
                    <option>1小时</option>
                    <option>2小时</option>
                    <option>4小时</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div v-else-if="activeSetting === 3">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">通知设置</h2>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input type="checkbox" id="emailNotifications" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked>
                  <label for="emailNotifications" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用邮件通知</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="smsNotifications" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="smsNotifications" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用短信通知</label>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">通知频率</label>
                  <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>实时通知</option>
                    <option>每日摘要</option>
                    <option>每周摘要</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div v-else-if="activeSetting === 4">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">外观设置</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">主题模式</label>
                  <div class="flex space-x-4">
                    <div class="flex items-center">
                      <input type="radio" id="lightTheme" name="theme" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked>
                      <label for="lightTheme" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">浅色模式</label>
                    </div>
                    <div class="flex items-center">
                      <input type="radio" id="darkTheme" name="theme" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <label for="darkTheme" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">深色模式</label>
                    </div>
                    <div class="flex items-center">
                      <input type="radio" id="autoTheme" name="theme" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                      <label for="autoTheme" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">跟随系统</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">主色调</label>
                  <div class="flex space-x-2">
                    <div v-for="color in themeColors" :key="color.id" 
                      :class="['h-8 w-8 rounded-full cursor-pointer border-2', 
                      color.id === activeColor ? 'border-blue-500' : 'border-gray-300']"
                      :style="{'background-color': color.value}"
                      @click="activeColor = color.id">
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">侧边栏宽度</label>
                  <select class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>紧凑 (200px)</option>
                    <option>标准 (250px)</option>
                    <option>宽松 (300px)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex justify-end">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'SystemSettings',
    setup() {
      const activeSetting = ref(1)
      const activeColor = ref(1)
      
      // 设置菜单
      const settingsMenu = ref([
        { id: 1, name: '基本设置', icon: 'fas fa-cog' },
        { id: 2, name: '安全设置', icon: 'fas fa-shield-alt' },
        { id: 3, name: '通知设置', icon: 'fas fa-bell' },
        { id: 4, name: '外观设置', icon: 'fas fa-palette' },
        { id: 5, name: '备份与恢复', icon: 'fas fa-database' },
        { id: 6, name: '关于系统', icon: 'fas fa-info-circle' },
      ])
      
      // 主题颜色
      const themeColors = ref([
        { id: 1, name: '蓝色', value: '#3b82f6' },
        { id: 2, name: '绿色', value: '#10b981' },
        { id: 3, name: '紫色', value: '#8b5cf6' },
        { id: 4, name: '红色', value: '#ef4444' },
        { id: 5, name: '橙色', value: '#f59e0b' },
      ])
      
      return {
        activeSetting,
        activeColor,
        settingsMenu,
        themeColors
      }
    }
  }
  </script>