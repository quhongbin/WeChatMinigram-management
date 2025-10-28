<template>
  <div class="h-full bg-gradient-to-br flex flex-col items-center justify-center text-gray-100">
    <!-- 终端容器 -->
    <div class="w-full h-full bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]">
      <!-- 终端标题栏 -->
      <div class="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700">
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" @click="closeTerminal"></div>
          <div class="w-3 h-3 rounded-full-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
          <div class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" @click="toggleConnection"></div>
        </div>
        <div class="ml-4 text-sm font-medium text-gray-300 flex items-center">
          <span>web-terminal</span>
          <span class="ml-2 text-xs px-2 py-0.5 rounded-full" :class="connectionStatusClass">
            {{ connectionStatusText }}
          </span>
        </div>
        <div class="ml-auto flex items-center space-x-4 text-xs text-gray-400">
          <span>Ctrl+C: 复制</span>
          <span>Ctrl+V: 粘贴</span>
        </div>
      </div>
      
      <!-- 终端内容区域 -->
      <div id="terminal-container" class="h-[500px] w-full"></div>
    </div>
    
    <!-- 底部信息 -->
    <p class="mt-6 text-xs text-gray-500">
      状态: {{ connectionStatusText }} | WebSocket 已预留，等待后端连接
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

// 连接状态
const isConnected = ref(false);
const connectionStatusText = ref('未连接');
const connectionStatusClass = ref('bg-gray-600');

// WebSocket 实例
let ws = null;
// 终端实例
let terminal = null;
// 输入缓冲区
let inputBuffer = '';
// WebSocket 地址 (实际使用时替换为后端地址)
const WS_URL = 'ws://localhost:8080/shell';

// 连接状态样式映射
watch(isConnected, (newVal) => {
  if (newVal) {
    connectionStatusText.value = '已连接';
    connectionStatusClass.value = 'bg-green-600';
  } else {
    connectionStatusText.value = '未连接';
    connectionStatusClass.value = 'bg-gray-600';
  }
});

onMounted(() => {
  // 初始化终端
  terminal = new Terminal({
    cursorBlink: true,
    cursorStyle: 'underline',
    theme: {
      background: '#111827', // 与Tailwind的bg-gray-900匹配
      foreground: '#e2e8f0', // 浅灰色文本
      cursor: '#38bdf8',     // 光标颜色
      selectionBackground: 'rgba(56, 189, 248, 0.2)'
    },
    fontSize: 14,
    fontFamily: "'Fira Code', Consolas, monospace",
    lineHeight: 1.4,
    scrollback: 1000
  });
  
  // 初始化FitAddon用于自适应尺寸
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  
  // 挂载终端到DOM
  const container = document.getElementById('terminal-container');
  terminal.open(container);
  
  // 适配容器尺寸
  fitAddon.fit();
  
  // 监听窗口大小变化，调整终端尺寸
  const handleResize = () => {
    fitAddon.fit();
  };
  
  window.addEventListener('resize', handleResize);
  
  // 初始信息
  terminal.write('Web Terminal 已启动,等待与后端建立连接...');
  prompt();
  
  // 处理终端输入
  terminal.onData((data) => {
    const key = data.charCodeAt(0);
    
    // 回车 - 发送命令
    if (key === 13) {
      terminal.write('\r\n');
      const command = inputBuffer.trim();
      inputBuffer = '';
      
      if (command && isConnected.value && ws) {
        // 通过WebSocket发送命令到后端
        ws.send(command);
      } else if (!isConnected.value) {
        terminal.write('错误: 未与后端建立连接');
      }
      prompt();
      return;
    }
    
    // 退格
    if (key === 127) {
      if (inputBuffer.length > 0) {
        inputBuffer = inputBuffer.slice(0, -1);
        terminal.write('\b \b');
      }
      return;
    }
    
    // 忽略控制字符
    if (key < 32) {
      return;
    }
    
    // 添加字符到输入缓冲区并显示
    inputBuffer += data;
    terminal.write(data);
  });
  
  // 组件卸载时清理
  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
    closeWebSocket();
    if (terminal) {
      terminal.dispose();
    }
  };
  
  return cleanup;
});

// 显示命令提示符
const prompt = () => {
  terminal.write('\r\x1B[32muser@web-terminal\x1B[0m:\x1B[34m~ \x1B[0m$ ');
};

// 切换WebSocket连接状态
const toggleConnection = () => {
  if (isConnected.value) {
    closeWebSocket();
  } else {
    connectWebSocket();
  }
};

// 连接WebSocket
const connectWebSocket = () => {
  if (ws) {
    ws.close();
  }
  
  try {
    ws = new WebSocket(WS_URL);
    
    // 连接打开时
    ws.onopen = () => {
      isConnected.value = true;
      terminal.write('\n已成功连接到后端shell\n\n');
      prompt();
    };
    
    // 收到消息时 (后端返回的shell输出)
    ws.onmessage = (event) => {
      // 将后端返回的内容显示在终端
      terminal.write(event.data);
    };
    
    // 连接关闭时
    ws.onclose = () => {
      isConnected.value = false;
      terminal.write('\n与后端的连接已关闭\n\n');
      prompt();
      ws = null;
    };
    
    // 连接出错时
    ws.onerror = (error) => {
      terminal.write(`\n连接错误: ${error.message}\n\n`);
      prompt();
    };
  } catch (error) {
    terminal.write(`\n无法建立连接: ${error.message}\n\n`);
    prompt();
  }
};

// 关闭WebSocket连接
const closeWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

// 关闭终端
const closeTerminal = () => {
  if (confirm('确定要关闭终端吗？')) {
    closeWebSocket();
    // 在实际应用中，这里可以添加关闭终端视图的逻辑
  }
};
</script>

<style scoped>
@import "tailwindcss";
/* 导入等宽字体用于终端显示 */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

#terminal-container {
  @apply font-mono;
}
</style>




使用tainwindcss4.1和vue3语法写一个关于web terminal的简单界面，使用xterm.js，


请预留websocket和后端shell通信的功能，不要模拟命令，界面只需要完成可以输入字符的功能