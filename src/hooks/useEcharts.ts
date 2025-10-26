import { reactive, ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
const name = ref('Dashboard')
const chartRef = ref(null)
const chartInstance = ref()
const timeRange = ref('month')

// 统计卡片数据
const stats = reactive([
    { 
    id: 1, 
    title: '总用户数', 
    value: '12,584', 
    icon: 'fas fa-users', 
    trend: 'up', 
    trendValue: '12.5%', 
    trendText: '较上月',
    color: 'blue'
    },
    { 
    id: 2, 
    title: '订单总数', 
    value: '3,284', 
    icon: 'fas fa-shopping-cart', 
    trend: 'up', 
    trendValue: '7.2%', 
    trendText: '较上月',
    color: 'green'
    },
    { 
    id: 3, 
    title: '总收入', 
    value: '¥84,259', 
    icon: 'fas fa-chart-line', 
    trend: 'up', 
    trendValue: '9.3%', 
    trendText: '较上月',
    color: 'purple'
    },
    { 
    id: 4, 
    title: '待处理', 
    value: '23', 
    icon: 'fas fa-exclamation-triangle', 
    trend: 'down', 
    trendValue: '3.1%', 
    trendText: '较上月',
    color: 'red'
    }
])

// 最近活动数据
const recentActivities = reactive([
    { id: 1, title: '新用户注册', time: '2分钟前', icon: 'fas fa-user-plus', bgColor: 'bg-blue-100 dark:bg-blue-800', textColor: 'text-blue-500 dark:text-blue-300' },
    { id: 2, title: '订单 #12345 已完成', time: '5分钟前', icon: 'fas fa-check-circle', bgColor: 'bg-green-100 dark:bg-green-800', textColor: 'text-green-500 dark:text-green-300' },
    { id: 3, title: '产品库存不足', time: '10分钟前', icon: 'fas fa-exclamation-triangle', bgColor: 'bg-yellow-100 dark:bg-yellow-800', textColor: 'text-yellow-500 dark:text-yellow-300' },
    { id: 4, title: '系统备份完成', time: '1小时前', icon: 'fas fa-database', bgColor: 'bg-purple-100 dark:bg-purple-800', textColor: 'text-purple-500 dark:text-purple-300' },
    { id: 5, title: '新版本发布', time: '2小时前', icon: 'fas fa-rocket', bgColor: 'bg-indigo-100 dark:bg-indigo-800', textColor: 'text-indigo-500 dark:text-indigo-300' },
])

// 模拟文章数据
const generateArticleData = (range: string) => {
    const categories = ['技术文章', '产品介绍', '行业资讯', '用户案例']
    const postsdata: Record<string, number[]> = {}
    
    // 根据时间范围生成不同的日期
    let dates: string[] = []
    if (range === 'week') {
    for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date.toISOString().split('T')[0] as string)
    }
    } else if (range === 'month') {
    for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date.toISOString().split('T')[0] as string)
    }
    } else {
    for (let i = 89; i >= 0; i -= 3) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date.toISOString().split('T')[0] as string)
    }
    }
    
    categories.forEach(category => {
    postsdata[category] = dates.map(date => {
        // 随机生成文章数量，但保持一定的趋势
        const baseValue = Math.floor(Math.random() * 20) + 5
        const trend = Math.sin(new Date(date).getTime() / 10000000) * 5
        return Math.max(0, Math.round(baseValue + trend))
    })
    })
    
    return { dates, postsdata }
}

// 初始化图表
const initChart = () => {
    if (!chartRef.value) return
    
    chartInstance.value = echarts.init(chartRef.value)
    updateChart()
}

// 更新图表数据
const updateChart = () => {
    if (!chartInstance.value) return
    
    const { dates, postsdata } = generateArticleData(timeRange.value)
    const categories = Object.keys(postsdata)
    
    const option = {
    tooltip: {
        show:true,
        trigger: 'none',
        axisPointer: {
        type: 'cross',
        label: {
            backgroundColor: '#6a7985'
        }
        }
    },
    legend: {
        data: categories,
        textStyle: {
        color: '#6b7280'
        },
        top: 0,
        left: 0,
        orient: 'horizontal'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
        color: '#6b7280',
        formatter: function(value:string) {
            const date = new Date(value)
            if (timeRange.value === 'week') {
            return date.getDate() + '日'
            } else if (timeRange.value === 'month') {
            return date.getMonth() + 1 + '月' + date.getDate()+ '日'
            } else {
            return date.getMonth() + 1 + ''
            }
        }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
        color: '#6b7280'
        }
    },
    series: categories.map(category => ({
        name: category,
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
        width: 2
        },
        showSymbol: false,
        areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: getCategoryColor(category, 0.8) },
            { offset: 1, color: getCategoryColor(category, 0.1) }
        ])
        },
        emphasis: {
        focus: 'series'
        },
        data: postsdata[category]
    }))
    }
    
    chartInstance.value.setOption(option)
}

// 获取类别颜色
const getCategoryColor = (category: string, opacity = 1) => {
    const colors: Record<string, string> = {
    '技术文章': `rgba(59, 130, 246, ${opacity})`,
    '产品介绍': `rgba(16, 185, 129, ${opacity})`,
    '行业资讯': `rgba(245, 158, 11, ${opacity})`,
    '用户案例': `rgba(139, 92, 246, ${opacity})`
    }
    return colors[category] || `rgba(99, 102, 241, ${opacity})`
}

// 切换时间范围
const changeTimeRange = (range:string) => {
    timeRange.value = range
    updateChart()
}


export {
    name,
    stats,
    recentActivities,
    chartRef,
    timeRange,
    chartInstance,
    changeTimeRange,
    initChart,
    updateChart,
}