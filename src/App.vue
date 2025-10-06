<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex h-screen overflow-hidden">
      <!-- 侧边栏 -->
      <Sidebar 
        :menuItems="menuItems"
        :activeMenu="activeMenu"
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="toggleSidebar"
        @set-active-menu="setActiveMenu"
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
        
        <!-- 主内容 -->
        <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
          <!-- 统计卡片 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              v-for="stat in stats"
              :key="stat.id"
              :title="stat.title"
              :value="stat.value"
              :icon="stat.icon"
              :trend="stat.trend"
              :trendValue="stat.trendValue"
              :trendText="stat.trendText"
              :color="stat.color"
            />
          </div>
          
          <!-- 图表和表格区域 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- 图表 -->
            <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">收入趋势</h2>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full">月</button>
                  <button class="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full">季度</button>
                  <button class="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full">年</button>
                </div>
              </div>
              <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-600 rounded-lg">
                <p class="text-gray-500 dark:text-gray-300">图表区域 - 可使用ECharts或Chart.js</p>
              </div>
            </div>
            
            <!-- 最近活动 -->
            <RecentActivity :activities="recentActivities" />
          </div>
          
          <!-- 数据表格 -->
          <UserTable :users="users" />
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
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import StatCard from './components/StatCard.vue'
import RecentActivity from './components/RecentActivity.vue'
import UserTable from './components/UserTable.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    StatCard,
    RecentActivity,
    UserTable
  },
  setup() {
    // 响应式数据
    const sidebarOpen = ref(true)
    const userMenuOpen = ref(false)
    const activeMenu = ref(1)
    
    // 菜单项数据
    const menuItems = ref([
      { id: 1, name: '仪表盘', icon: 'fas fa-tachometer-alt' },
      { id: 2, name: '用户管理', icon: 'fas fa-users' },
      { id: 3, name: '订单管理', icon: 'fas fa-shopping-cart' },
      { id: 4, name: '产品管理', icon: 'fas fa-box' },
      { id: 5, name: '数据分析', icon: 'fas fa-chart-bar' },
      { id: 6, name: '消息中心', icon: 'fas fa-comments', badge: 5 },
      { id: 7, name: '系统设置', icon: 'fas fa-cog' },
    ])
    
    // 统计卡片数据
    const stats = ref([
      { 
        id: 1, 
        title: '总用户数', 
        value: '12,584', 
        icon: 'fas fa-users', 
        trend: 'up', 
        trendValue: '12.5%', 
        trendText: '较上月',
        color: 'blue'
      },
      { 
        id: 2, 
        title: '订单总数', 
        value: '3,284', 
        icon: 'fas fa-shopping-cart', 
        trend: 'up', 
        trendValue: '7.2%', 
        trendText: '较上月',
        color: 'green'
      },
      { 
        id: 3, 
        title: '总收入', 
        value: '¥84,259', 
        icon: 'fas fa-chart-line', 
        trend: 'up', 
        trendValue: '9.3%', 
        trendText: '较上月',
        color: 'purple'
      },
      { 
        id: 4, 
        title: '待处理', 
        value: '23', 
        icon: 'fas fa-exclamation-triangle', 
        trend: 'down', 
        trendValue: '3.1%', 
        trendText: '较上月',
        color: 'red'
      }
    ])
    
    // 用户数据
    const users = ref([
      { id: 1, name: '张三', email: 'zhangsan@example.com', status: '活跃', role: '管理员', lastLogin: '2023-07-20 14:30' },
      { id: 2, name: '李四', email: 'lisi@example.com', status: '活跃', role: '编辑', lastLogin: '2023-07-19 10:15' },
      { id: 3, name: '王五', email: 'wangwu@example.com', status: '非活跃', role: '查看者', lastLogin: '2023-07-15 16:45' },
      { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: '活跃', role: '编辑', lastLogin: '2023-07-20 09:20' },
      { id: 5, name: '钱七', email: 'qianqi@example.com', status: '活跃', role: '管理员', lastLogin: '2023-07-18 11:30' },
    ])
    
    // 最近活动数据
    const recentActivities = ref([
      { id: 1, title: '新用户注册', time: '2分钟前', icon: 'fas fa-user-plus', bgColor: 'bg-blue-100 dark:bg-blue-800', textColor: 'text-blue-500 dark:text-blue-300' },
      { id: 2, title: '订单 #12345 已完成', time: '5分钟前', icon: 'fas fa-check-circle', bgColor: 'bg-green-100 dark:bg-green-800', textColor: 'text-green-500 dark:text-green-300' },
      { id: 3, title: '产品库存不足', time: '10分钟前', icon: 'fas fa-exclamation-triangle', bgColor: 'bg-yellow-100 dark:bg-yellow-800', textColor: 'text-yellow-500 dark:text-yellow-300' },
      { id: 4, title: '系统备份完成', time: '1小时前', icon: 'fas fa-database', bgColor: 'bg-purple-100 dark:bg-purple-800', textColor: 'text-purple-500 dark:text-purple-300' },
      { id: 5, title: '新版本发布', time: '2小时前', icon: 'fas fa-rocket', bgColor: 'bg-indigo-100 dark:bg-indigo-800', textColor: 'text-indigo-500 dark:text-indigo-300' },
    ])
    
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
    
    const setActiveMenu = (id) => {
      activeMenu.value = id
      // 在移动端选择菜单后自动关闭侧边栏
      if (window.innerWidth < 768) {
        sidebarOpen.value = false
      }
    }
    
    return {
      sidebarOpen,
      userMenuOpen,
      activeMenu,
      menuItems,
      stats,
      users,
      recentActivities,
      getActiveMenuName,
      toggleSidebar,
      toggleUserMenu,
      setActiveMenu
    }
  }
}
</script>

<style>
@import "tailwindcss";
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