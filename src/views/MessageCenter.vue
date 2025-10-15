<template>
    <div>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">消息中心</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 消息列表 -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">消息列表</h2>
            <button class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-sm">
              标记全部为已读
            </button>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-600">
            <div v-for="message in messages" :key="message.id" 
              :class="['p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600', 
              message.unread ? 'bg-blue-50 dark:bg-blue-900/20' : '']">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div :class="['h-10 w-10 rounded-full flex items-center justify-center', 
                    message.type === 'system' ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' :
                    message.type === 'user' ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                    'bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-300']">
                    <i :class="message.icon"></i>
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ message.title }}</p>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                  </div>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ message.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 消息分类 -->
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6 h-fit">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">消息分类</h2>
          <div class="space-y-4">
            <div v-for="category in categories" :key="category.id" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
              <div class="flex items-center">
                <div :class="['h-8 w-8 rounded-full flex items-center justify-center mr-3', category.bgColor]">
                  <i :class="[category.icon, category.textColor]"></i>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ category.name }}</span>
              </div>
              <span :class="['text-xs font-medium px-2 py-1 rounded-full', 
                category.count > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300']">
                {{ category.count }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'

const name=ref( 'MessageCenter' )
// 消息数据
const messages = reactive([
{ 
    id: 1, 
    title: '系统通知', 
    content: '系统将于今晚凌晨2点进行维护，预计持续2小时', 
    time: '2小时前', 
    type: 'system', 
    icon: 'fas fa-cog',
    unread: true
},
{ 
    id: 2, 
    tiele: '新用户注册', 
    content: '用户"李四"刚刚注册了账户', 
    time: '5小时前', 
    type: 'user', 
    icon: 'fas fa-user-plus',
    unread: true
},
{ 
    id: 3, 
    title: '订单完成', 
    content: '订单 #10023 已完成支付', 
    time: '1天前', 
    type: 'order', 
    icon: 'fas fa-check-circle',
    unread: false
},
{ 
    id: 4, 
    title: '库存提醒', 
    content: '产品"智能手机"库存不足，请及时补货', 
    time: '2天前', 
    type: 'warning', 
    icon: 'fas fa-exclamation-triangle',
    unread: false
},
{ 
    id: 5, 
    title: '系统更新', 
    content: '系统已更新至最新版本 v2.1.0', 
    time: '3天前', 
    type: 'system', 
    icon: 'fas fa-sync',
    unread: false
},
])

// 分类数据
const categories = reactive([
    { id: 1, name: '全部消息', icon: 'fas fa-inbox', bgColor: 'bg-blue-100 dark:bg-blue-800', textColor: 'text-blue-600 dark:text-blue-300', count: 5 },
    { id: 2, name: '未读消息', icon: 'fas fa-envelope', bgColor: 'bg-green-100 dark:bg-green-800', textColor: 'text-green-600 dark:text-green-300', count: 2 },
    { id: 3, name: '系统通知', icon: 'fas fa-cog', bgColor: 'bg-purple-100 dark:bg-purple-800', textColor: 'text-purple-600 dark:text-purple-300', count: 2 },
    { id: 4, name: '用户消息', icon: 'fas fa-users', bgColor: 'bg-yellow-100 dark:bg-yellow-800', textColor: 'text-yellow-600 dark:text-yellow-300', count: 1 },
    { id: 5, name: '订单消息', icon: 'fas fa-shopping-cart', bgColor: 'bg-red-100 dark:bg-red-800', textColor: 'text-red-600 dark:text-red-300', count: 1 },
])
</script>