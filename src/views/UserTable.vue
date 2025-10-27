<template>
  <div class="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">用户列表</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead class="bg-gray-50 dark:bg-gray-600">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">用户</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">角色</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">最后登录</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
          <tr v-for="user in props.users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {{ user.username.charAt(0) }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.username }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', 
                  user.status === '活跃' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300']">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.lastLogin }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                 class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3 border border-blue-600 dark:border-blue-400 rounded-md px-2 py-1"
                 v-on:click="editUser(user)">编辑</button>
              <button
                 class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 border border-red-600 dark:border-red-400 rounded-md px-2 py-1"
                 v-on:click="deleteUser(user.id,user.username)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          显示 <span class="font-medium">1</span> 到 <span class="font-medium">5</span> 条，共 <span class="font-medium">50</span> 条
        </div>
        <div class="flex space-x-2">
          <button class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-400">上一页</button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">下一页</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 编辑用户弹窗 -->
  <el-dialog v-model="dialogVisible" title="编辑用户" width="500px">
    <el-form ref="formRef" :model="editingUser" :rules="formRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editingUser.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editingUser.email" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-input v-model="editingUser.role" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, defineProps, ref } from 'vue';
import { type FilteredUser } from '../types/UserTypes';
import { ElMessage,ElMessageBox } from 'element-plus';
import { API_ENDPOINTS, getApiUrl } from '../config/api';



// 正确定义props
interface Props {
  users: Array<FilteredUser>
  getUsers: () => Promise<void>
}

const props = defineProps<Props>()
const name= 'UserTable'

// 编辑弹窗相关数据
const dialogVisible = ref(false)
const editingUser = ref({
  id: 0,
  username: '',
  email: '',
  role: ''
})

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref()

function editUser(user: FilteredUser): void {
  // 获取当前用户数据并传递给编辑弹窗
  editingUser.value = { ...user }
  dialogVisible.value = true
}

function deleteUser(user_id:number,username:string){
  ElMessageBox.confirm(`确认删除用户${username}吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  .then(async()=>{
    try {
      const response = await axios.delete(getApiUrl(API_ENDPOINTS.USERS.DELETE(user_id)))
      if (response.data.success) {
        ElMessage({message: `${response.data.message}`,type: 'success'})
      }
      props.getUsers()
    } catch (error) {
      ElMessage({message: '删除操作失败',type: 'error'})
    }
  })
  .catch(() => {
    ElMessage({message: '删除操作已取消',type: 'info'})
  })
}

// 保存用户数据
async function saveUser() {
  // 表单验证
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const response = await axios.put(getApiUrl(API_ENDPOINTS.USERS.UPDATE(editingUser.value.id)), editingUser.value)
        if (response.data.success) {
          ElMessage({ message: '用户信息更新成功', type: 'success' })
          dialogVisible.value = false
          // 更新用户列表
          props.getUsers()
        } else {
          ElMessage({ message: '用户信息更新失败', type: 'error' })
        }
      } catch (error) {
        ElMessage({ message: '用户信息更新失败', type: 'error' })
      }
    } else {
      ElMessage({ message: '请填写正确的表单信息', type: 'warning' })
      return false
    }
  })
}

</script>