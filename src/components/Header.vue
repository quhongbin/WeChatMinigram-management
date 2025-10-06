<template>
  <header class="bg-white dark:bg-gray-700 shadow-sm z-10">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center">
        <button @click="$emit('toggle-sidebar')" class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none">
          <i class="fas fa-bars text-xl"></i>
        </button>
        <h1 class="ml-4 text-xl font-semibold text-gray-800 dark:text-white">{{ activeMenuName }}</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- 搜索框 -->
        <div class="hidden md:block relative">
          <input 
            type="text" 
            placeholder="搜索..." 
            class="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-800 dark:text-white">
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        
        <!-- 通知 -->
        <div class="relative">
          <button class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none">
            <i class="fas fa-bell text-xl"></i>
            <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
        
        <!-- 用户菜单 -->
        <div class="relative">
          <button @click="$emit('toggle-user-menu')" class="flex items-center text-sm focus:outline-none">
            <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span class="font-bold text-white">A</span>
            </div>
            <span class="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">管理员</span>
            <i class="fas fa-chevron-down ml-1 text-gray-500 dark:text-gray-400"></i>
          </button>
          
          <!-- 用户下拉菜单 -->
          <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">个人资料</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">设置</a>
            <div class="border-t border-gray-200 dark:border-gray-600"></div>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">退出登录</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    activeMenuName: {
      type: String,
      required: true
    },
    userMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-sidebar', 'toggle-user-menu']
}
</script>