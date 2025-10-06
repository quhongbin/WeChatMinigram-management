
<template>
  <div class="bg-white dark:bg-gray-700 rounded-lg shadow card-hover p-6">
    <div class="flex items-center">
      <div :class="['p-3 rounded-full', colorClasses.bg, colorClasses.text]">
        <i :class="[icon, 'text-xl']"></i>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ title }}</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ value }}</p>
      </div>
    </div>
    <div class="mt-4">
      <span :class="['text-sm font-medium', trendClasses]">
        <i :class="[trendIcon, 'mr-1']"></i>{{ trendValue }}
      </span>
      <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">{{ trendText }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    trend: {
      type: String,
      required: true,
      validator: (value) => ['up', 'down'].includes(value)
    },
    trendValue: {
      type: String,
      required: true
    },
    trendText: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true,
      validator: (value) => ['blue', 'green', 'purple', 'red'].includes(value)
    }
  },
  setup(props) {
    const colorClasses = computed(() => {
      const classes = {
        blue: {
          bg: 'bg-blue-100 dark:bg-blue-800',
          text: 'text-blue-500 dark:text-blue-300'
        },
        green: {
          bg: 'bg-green-100 dark:bg-green-800',
          text: 'text-green-500 dark:text-green-300'
        },
        purple: {
          bg: 'bg-purple-100 dark:bg-purple-800',
          text: 'text-purple-500 dark:text-purple-300'
        },
        red: {
          bg: 'bg-red-100 dark:bg-red-800',
          text: 'text-red-500 dark:text-red-300'
        }
      }
      return classes[props.color]
    })
    
    const trendClasses = computed(() => {
      return props.trend === 'up' 
        ? 'text-green-500 dark:text-green-400' 
        : 'text-red-500 dark:text-red-400'
    })
    
    const trendIcon = computed(() => {
      return props.trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
    })
    
    return {
      colorClasses,
      trendClasses,
      trendIcon
    }
  }
}
</script>