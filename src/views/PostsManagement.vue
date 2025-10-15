<template>
    <div>
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">文章管理</h1>
        <button 
          @click="showCreatePost = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <i class="fas fa-plus mr-2"></i>
          创建文章
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">总文章数</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ postsCounts }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-300">
              <i class="fas fa-check-circle text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">预留字段</p>
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">预留字段</p>
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">预留字段</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">200</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 订单表格 -->
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">文章列表</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Content</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">tags</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">filePath</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="post in posts" :key="post.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ post.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ post.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ post.tags }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', 
                      post.status === '已完成' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                      post.status === '处理中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100']">
                    {{ post.tags }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ post.file_path }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <!-- <a href="#" class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:tex t-blue-300 mr-3">查看</a> -->
                  <a href="#" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                   @click="deletePost(post.id)">删除</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  <!-- 创建文章弹窗 -->
  <PostsManagementCreatePosts 
    v-if="showCreatePost"
    @close="showCreatePost = false"
    @post-created="handlePostCreated"
  />
</template>
  
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import PostsManagementCreatePosts from './PostsManagementCreatePosts.vue'
  
const name = ref('PostsManagement')

// 显示创建文章弹窗
const showCreatePost = ref(false)

onMounted(()=>{
  getPosts();
  getPostsCounts();
})


/* 文章数据 */
import { type Post } from '../types/PostTypes';
const posts = ref<Post[]>([]);
let postsCounts = ref(0);

/* 获取所有文章数据
 * @description: 获取所有文章数据
*/
async function getPosts() {
  try {
    const response = await axios.get('http://localhost:3000/api/posts/all');
    posts.value = response.data.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
  }
}
/* 获取文章数量 */
async function getPostsCounts() {
  try {
    const response = await axios.get('http://localhost:3000/api/posts/count');
    postsCounts.value = response.data.data;
  } catch (error) {
    console.error('获取文章数量失败:', error);
  }
}
/* 通过id删除文章 */
/* 会操作数据库 */
async function deletePost(id:number) {
  try {
    // 确认删除
    const confirmDelete = confirm('确定删除这篇文章吗？');
    if (!confirmDelete) {
      return;
    }
    await axios.delete(`/api/posts/${id}`);
    // 删除成功后，刷新文章列表
    getPosts();
  } catch (error) {
    console.error('删除文章失败:', error);
  }
}

/**
 * 处理文章创建成功后的回调
 */
function handlePostCreated() {
  // 重新获取文章列表和数量
  getPosts();
  getPostsCounts();
}
</script>