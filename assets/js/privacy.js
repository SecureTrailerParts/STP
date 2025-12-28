// DOM元素
const privacyTrigger = document.getElementById('privacyTrigger');
const privacyPanel = document.getElementById('privacyPanel');
const closePanel = document.getElementById('closePanel');
const analyticsToggle = document.getElementById('analyticsToggle');
const marketingToggle = document.getElementById('marketingToggle');
const acceptAll = document.getElementById('acceptAll');
const rejectAll = document.getElementById('rejectAll');
const saveSettings = document.getElementById('saveSettings');

// 当前设置状态
let currentSettings = {
    necessary: true,  // 始终启用
    analytics: false,
    marketing: false
};

// 从本地存储加载设置
function loadSettings() {
    const saved = localStorage.getItem('cookieSettings');
    if (saved) {
        currentSettings = { ...currentSettings, ...JSON.parse(saved) };
        updateToggles();
        updateStatusIndicator();
    }
}

// 更新切换开关状态
function updateToggles() {
    analyticsToggle.checked = currentSettings.analytics;
    marketingToggle.checked = currentSettings.marketing;
}

// 更新状态指示器
function updateStatusIndicator() {
    const { analytics, marketing } = currentSettings;
}

// 保存设置到本地存储
function saveSettingsToStorage() {
    localStorage.setItem('cookieSettings', JSON.stringify(currentSettings));
    updateStatusIndicator();

    // 在实际应用中，这里会调用相应的启用/禁用函数
    if (currentSettings.analytics) {
        // enableAnalytics();
    } else {
        // disableAnalytics();
    }

    if (currentSettings.marketing) {
        // enableMarketing();
    } else {
        // disableMarketing();
    }
}

// 事件监听器
privacyTrigger.addEventListener('click', () => {
    privacyPanel.classList.toggle('active');
});

closePanel.addEventListener('click', () => {
    privacyPanel.classList.remove('active');
});

analyticsToggle.addEventListener('change', (e) => {
    currentSettings.analytics = e.target.checked;
});

marketingToggle.addEventListener('change', (e) => {
    currentSettings.marketing = e.target.checked;
});

acceptAll.addEventListener('click', () => {
    currentSettings.analytics = true;
    currentSettings.marketing = true;
    updateToggles();
    saveSettingsToStorage();
    privacyPanel.classList.remove('active');

    // 显示确认消息
    showNotification('All cookie settings have been accepted.');
});

rejectAll.addEventListener('click', () => {
    currentSettings.analytics = false;
    currentSettings.marketing = false;
    updateToggles();
    saveSettingsToStorage();
    privacyPanel.classList.remove('active');

    // 显示确认消息
    showNotification('Have rejected unnecessary cookies.');
});

saveSettings.addEventListener('click', () => {
    saveSettingsToStorage();
    privacyPanel.classList.remove('active');

    // 显示确认消息
    showNotification('Cookie settings have been saved.');
});

// 点击面板外部关闭
document.addEventListener('click', (e) => {
    if (!privacyPanel.contains(e.target) && !privacyTrigger.contains(e.target)) {
        privacyPanel.classList.remove('active');
    }
});

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1001;
                transition: all 0.3s ease;
            `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 初始化
loadSettings();

// 添加键盘支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyPanel.classList.contains('active')) {
        privacyPanel.classList.remove('active');
    }
});

// 禁用右键菜单
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// 禁用图片拖拽
document.addEventListener('dragstart', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
    }
});

// 禁用图片复制
document.addEventListener('copy', function (e) {
    const selection = window.getSelection();
    if (selection.toString().includes('<img') || e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
    }
});

// 禁用F12快捷键
document.addEventListener('keydown', function (e) {
    // 禁止F12
    if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
    }
    // 额外防护：禁止 Ctrl+Shift+I（Chrome/Firefox打开开发者工具）
    else if ((e.ctrlKey && e.shiftKey && e.key === 'I') ||
        // 禁止 Ctrl+U（查看网页源代码）
        (e.ctrlKey && e.key === 'u') ||
        // 禁止 Ctrl+S（保存网页，会连带保存图片）
        (e.ctrlKey && e.key === 's')) {
        e.preventDefault();
        e.stopPropagation();
    }
});
