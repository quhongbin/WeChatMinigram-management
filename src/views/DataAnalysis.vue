<template>
    <div>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">数据分析</h1>
      
      <!-- 图表区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">销售趋势</h2>
          <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-600 rounded-lg">
            <p class="text-gray-500 dark:text-gray-300">销售趋势图表</p>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">用户分布</h2>
          <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-600 rounded-lg">
            <p class="text-gray-500 dark:text-gray-300">用户分布图表</p>
          </div>
        </div>
      </div>
      
      <!-- 数据表格 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">关键指标</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">指标</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">本月</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">上月</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">同比增长</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="metric in metrics" :key="metric.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ metric.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ metric.currentMonth }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ metric.lastMonth }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', 
                      metric.growth > 0 ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100']">
                    {{ metric.growth > 0 ? '+' : '' }}{{ metric.growth }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'DataAnalysis',
    setup() {
      // 指标数据
      const metrics = ref([
        { id: 1, name: '销售额', currentMonth: '¥84,259', lastMonth: '¥77,120', growth: 9.3 },
        { id: 2, name: '订单数', currentMonth: '3,284', lastMonth: '3,062', growth: 7.2 },
        { id: 3, name: '用户数', currentMonth: '12,584', lastMonth: '11,185', growth: 12.5 },
        { id: 4, name: '平均订单价值', currentMonth: '¥256.63', lastMonth: '¥251.89', growth: 1.9 },
        { id: 5, name: '转化率', currentMonth: '4.2%', lastMonth: '3.9%', growth: 7.7 },
      ])
      
      return {
        metrics
      }
    }
  }
  </script>