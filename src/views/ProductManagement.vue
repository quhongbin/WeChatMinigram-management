<template>
    <div>
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">产品管理</h1>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <i class="fas fa-plus mr-2"></i>
          添加产品
        </button>
      </div>
      
      <!-- 产品列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden card-hover">
          <div class="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
            <i class="fas fa-box text-4xl text-gray-400"></i>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ product.name }}</h3>
              <span class="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                {{ product.category }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ product.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-lg font-bold text-gray-900 dark:text-white">{{ product.price }}</span>
              <div class="flex space-x-2">
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'ProductManagement',
    setup() {
      // 产品数据
      const products = ref([
        { 
          id: 1, 
          name: '智能手机', 
          description: '高性能智能手机，配备最新处理器和摄像头', 
          price: '¥3,299', 
          category: '电子'
        },
        { 
          id: 2, 
          name: '笔记本电脑', 
          description: '轻薄便携，适合商务和日常使用', 
          price: '¥5,999', 
          category: '电子'
        },
        { 
          id: 3, 
          name: '无线耳机', 
          description: '高品质音效，长时间续航', 
          price: '¥899', 
          category: '配件'
        },
        { 
          id: 4, 
          name: '智能手表', 
          description: '健康监测，运动追踪', 
          price: '¥1,299', 
          category: '穿戴'
        },
        { 
          id: 5, 
          name: '平板电脑', 
          description: '大屏幕，适合娱乐和学习', 
          price: '¥2,599', 
          category: '电子'
        },
        { 
          id: 6, 
          name: '蓝牙音箱', 
          description: '360度环绕音效，便携设计', 
          price: '¥499', 
          category: '配件'
        },
      ])
      
      return {
        products
      }
    }
  }
  </script>