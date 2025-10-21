/**
 * API 配置
 * 统一管理所有后端API地址
 */

// 服务器基础地址
export const API_BASE_URL = 'http://localhost:3000'

// API 端点配置
export const API_ENDPOINTS = {
  // 用户相关API
  USERS: {
    BASE: '/api/users',
    GET_ALL: '/api/users',
    GET_BY_ID: (id: number) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: number) => `/api/users/${id}`,
    DELETE: (id: number) => `/api/users/${id}`
  },
  
  // 文章相关API
  POSTS: {
    BASE: '/api/posts',
    GET_ALL: '/api/posts/all',
    GET_BY_ID: (id: number) => `/api/posts/${id}`,
    CREATE: '/api/posts',
    UPDATE: (id: number) => `/api/posts/${id}`,
    DELETE: (id: number) => `/api/posts/${id}`,
    COUNT: '/api/posts/count'
  },
  
  // 产品相关API
  PRODUCTS: {
    BASE: '/api/products',
    GET_ALL: '/api/products',
    GET_BY_ID: (id: number) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id: number) => `/api/products/${id}`,
    DELETE: (id: number) => `/api/products/${id}`
  },
  
  // 数据分析相关API
  ANALYTICS: {
    BASE: '/api/analytics',
    DASHBOARD: '/api/analytics/dashboard'
  }
}

// 完整的API URL生成函数
export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`
}

// 默认的axios配置
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}