<template>
    <div>
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
    </div>
  </template>
  
<script>
import { reactive, ref } from 'vue'
// import StatCard from '../components/StatCard.vue'
// import RecentActivity from '../components/RecentActivity.vue'

const name=ref ( 'Dashboard' )
// 统计卡片数据
const stats = reactive([
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

// 最近活动数据
const recentActivities = reactive([
    { id: 1, title: '新用户注册', time: '2分钟前', icon: 'fas fa-user-plus', bgColor: 'bg-blue-100 dark:bg-blue-800', textColor: 'text-blue-500 dark:text-blue-300' },
    { id: 2, title: '订单 #12345 已完成', time: '5分钟前', icon: 'fas fa-check-circle', bgColor: 'bg-green-100 dark:bg-green-800', textColor: 'text-green-500 dark:text-green-300' },
    { id: 3, title: '产品库存不足', time: '10分钟前', icon: 'fas fa-exclamation-triangle', bgColor: 'bg-yellow-100 dark:bg-yellow-800', textColor: 'text-yellow-500 dark:text-yellow-300' },
    { id: 4, title: '系统备份完成', time: '1小时前', icon: 'fas fa-database', bgColor: 'bg-purple-100 dark:bg-purple-800', textColor: 'text-purple-500 dark:text-purple-300' },
    { id: 5, title: '新版本发布', time: '2小时前', icon: 'fas fa-rocket', bgColor: 'bg-indigo-100 dark:bg-indigo-800', textColor: 'text-indigo-500 dark:text-indigo-300' },
])
</script>