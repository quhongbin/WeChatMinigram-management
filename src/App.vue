<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex h-screen overflow-hidden">
      <!-- 侧边栏 -->
      <Sidebar 
        :menuItems="menuItems"
        :activeMenu="activeMenu"
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="toggleSidebar"
      />
      
      <!-- 主内容区域 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 顶部栏 -->
        <Header 
          :activeMenuName="getActiveMenuName"
          :userMenuOpen="userMenuOpen"
          @toggle-sidebar="toggleSidebar"
          @toggle-user-menu="toggleUserMenu"
        />
        
        <!-- 主内容 - 使用路由视图 -->
        <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
          <router-view></router-view>
        </main>
      </div>
    </div>
    
    <!-- 移动端菜单遮罩 -->
    <div 
      v-if="sidebarOpen" 
      @click="toggleSidebar"
      class="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
    ></div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header
  },
  setup() {
    const route = useRoute()
    
    // 响应式数据
    const sidebarOpen = ref(true)
    const userMenuOpen = ref(false)
    const activeMenu = ref(1)
    
    // 菜单项数据 - 添加路由路径
    const menuItems = ref([
      { id: 1, name: '仪表盘', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
      { id: 2, name: '用户管理', icon: 'fas fa-users', route: '/users' },
      { id: 3, name: '文章管理', icon: 'fas fa-shopping-cart', route: '/posts' },
      // { id: 4, name: '产品管理', icon: 'fas fa-box', route: '/products' },
      { id: 5, name: '数据分析', icon: 'fas fa-chart-bar', route: '/analytics' },
      { id: 6, name: '消息中心', icon: 'fas fa-comments', badge: 5, route: '/messages' },
      { id: 7, name: '系统设置', icon: 'fas fa-cog', route: '/settings' },
    ])
    
    // 根据当前路由设置活动菜单
    const setActiveMenuFromRoute = () => {
      const currentRoute = route.path
      const menuItem = menuItems.value.find(item => item.route === currentRoute)
      if (menuItem) {
        activeMenu.value = menuItem.id
      }
    }
    
    // 监听路由变化
    watch(() => route.path, () => {
      setActiveMenuFromRoute()
    })
    
    // 初始化时设置活动菜单
    setActiveMenuFromRoute()
    
    // 计算属性
    const getActiveMenuName = computed(() => {
      const item = menuItems.value.find(item => item.id === activeMenu.value)
      return item ? item.name : '仪表盘'
    })
    
    // 方法
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }
    
    const toggleUserMenu = () => {
      userMenuOpen.value = !userMenuOpen.value
    }
    
    return {
      sidebarOpen,
      userMenuOpen,
      activeMenu,
      menuItems,
      getActiveMenuName,
      toggleSidebar,
      toggleUserMenu
    }
  }
}
</script>

<style>
/* 全局样式 */
.sidebar-transition {
  transition: all 0.3s ease;
}

.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>