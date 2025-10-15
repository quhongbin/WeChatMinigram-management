<template>
  <aside :class="['sidebar-transition bg-gray-800 dark:bg-gray-900 text-white w-64 flex flex-col fixed md:relative z-30 h-full', {'-ml-64 md:-ml-0': !sidebarOpen}]">
    <!-- Logo区域 -->
    <div class="p-4 flex items-center justify-between border-b border-gray-700">
      <div class="flex items-center">
        <i class="fas fa-chart-line text-blue-400 text-2xl mr-2"></i>
        <span class="text-xl font-bold">AdminPro</span>
      </div>
      <button @click="$emit('toggle-sidebar')" class="md:hidden text-gray-400 hover:text-white">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <!-- 用户信息 -->
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span class="font-bold">A</span>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">管理员</p>
          <p class="text-xs text-gray-400 ">admin@example.com</p>
        </div>
      </div>
    </div>
    
    <!-- 导航菜单 -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <router-link 
            :to="item.route"
            @click="$emit('toggle-sidebar')"
            :class="['block px-4 py-3 text-sm flex items-center', 
            activeMenu === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
            <i :class="['mr-3 w-5 text-center', item.icon]"></i>
            <span>{{ item.name }}</span>
            <span v-if="item.badge" class="ml-auto bg-red-500 text-xs rounded-full px-2 py-1">{{ item.badge }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- 底部区域 -->
    <div class="p-4 border-t border-gray-700">
      <router-link to="/settings" class="flex items-center text-gray-300 hover:text-white text-sm">
        <i class="fas fa-cog mr-3"></i>
        <span>系统设置</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    activeMenu: {
      type: Number,
      required: true
    },
    sidebarOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-sidebar']
}
</script>