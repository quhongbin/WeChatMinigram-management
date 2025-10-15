<template>
    <div>
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">订单管理</h1>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <i class="fas fa-plus mr-2"></i>
          创建订单
        </button>
      </div>
      
      <!-- 订单统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-500 dark:text-blue-300">
              <i class="fas fa-shopping-cart text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">总订单数</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">3,284</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-300">
              <i class="fas fa-check-circle text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">已完成</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">2,956</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-500 dark:text-yellow-300">
              <i class="fas fa-clock text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">待处理</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">128</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 dark:bg-red-800 text-red-500 dark:text-red-300">
              <i class="fas fa-times-circle text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">已取消</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">200</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 订单表格 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">订单列表</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">订单号</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">客户</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">金额</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">日期</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="order in orders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  #{{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ order.customer }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ order.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', 
                      order.status === '已完成' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                      order.status === '处理中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100']">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ order.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">查看</a>
                  <a href="#" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">取消</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { reactive, ref } from 'vue'
  
const name=ref( 'OrderManagement' )
    // 订单数据
const orders = reactive([
    { id: 1001, customer: '张三', amount: '¥1,280.00', status: '已完成', date: '2023-07-20' },
    { id: 1002, customer: '李四', amount: '¥2,450.00', status: '处理中', date: '2023-07-19' },
    { id: 1003, customer: '王五', amount: '¥890.00', status: '已完成', date: '2023-07-18' },
    { id: 1004, customer: '赵六', amount: '¥1,560.00', status: '已取消', date: '2023-07-17' },
    { id: 1005, customer: '钱七', amount: '¥3,200.00', status: '处理中', date: '2023-07-16' },
])
    
</script>