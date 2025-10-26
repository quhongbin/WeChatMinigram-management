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
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <!-- 图表 -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">文章发布趋势</h2>
            <div class="flex space-x-2">
              <button @click="changeTimeRange('week')" :class="['px-3 py-1 text-xs rounded-full', timeRange === 'week' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600']">周</button>
              <button @click="changeTimeRange('month')" :class="['px-3 py-1 text-xs rounded-full', timeRange === 'month' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600']">月</button>
              <button @click="changeTimeRange('quarter')" :class="['px-3 py-1 text-xs rounded-full', timeRange === 'quarter' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600']">季度</button>
            </div>
          </div>
          <div ref="chartRef" class="h-64 w-full"></div>
        </div>
        
        <!-- 最近活动 -->
        <!-- <RecentActivity :activities="recentActivities" /> -->
      </div>
    </div>
  </template>
  
<script>
import { reactive, ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import StatCard from '../components/StatCard.vue'
import RecentActivity from '../components/RecentActivity.vue'
import {
    name,
    stats,
    recentActivities,
    chartRef,
    timeRange,
    changeTimeRange
} from '../hooks/useEcharts'

export default {
  name: 'Dashboard',
  components: {
    StatCard,
    RecentActivity
  },
}</script>