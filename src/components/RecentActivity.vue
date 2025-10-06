<template>
  <div class="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-6">最近活动</h2>
    <div class="space-y-4">
      <div v-for="activity in activities" :key="activity.id" class="flex items-start">
        <div :class="['p-2 rounded-full', activity.bgColor]">
          <i :class="[activity.icon, activity.textColor]"></i>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentActivity',
  props: {
    activities: {
      type: Array,
      required: true
    }
  }
}
</script>