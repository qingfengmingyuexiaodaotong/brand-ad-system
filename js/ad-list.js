// 广告列表页面JavaScript

// 模拟广告数据
const mockAds = [
    {
        id: 1,
        brandId: 1,
        brandName: "Nike运动",
        brandIndustry: "时尚",
        title: "Nike新款跑鞋",
        description: "专业跑步装备，提升运动表现",
        type: "image",
        typeText: "图片",
        activity: "是",
        device: "iOS",
        position: "信息流",
        status: "online",
        statusText: "在线",
        onlineTime: "2024-01-15 10:30:00 至 2024-02-15 10:30:00",
        exposureControl: "5次/天/用户",
        peerControl: "3个广告位",
        startDate: "2024-01-15 10:30:00",
        endDate: "2024-02-15 10:30:00",
        region: "全国",
        priority: 1,
        deviceType: "iOS",
        link: "https://nike.com/campaign",
        material: "https://via.placeholder.com/300x200/3b82f6/ffffff?text=Nike+Ad"
    },
    {
        id: 2,
        brandId: 2,
        brandName: "Apple科技",
        brandIndustry: "科技",
        title: "iPhone 15 Pro",
        description: "突破性的智能手机体验",
        type: "video",
        typeText: "视频",
        activity: "否",
        device: "Android",
        position: "开屏广告",
        status: "offline",
        statusText: "下线",
        onlineTime: "2024-01-10 14:20:00 至 2024-02-10 14:20:00",
        exposureControl: "8次/天/用户",
        peerControl: "5个广告位",
        startDate: "2024-01-10 14:20:00",
        endDate: "2024-02-10 14:20:00",
        region: "北京、上海、广州",
        priority: 2,
        deviceType: "Android",
        link: "https://apple.com/iphone15",
        material: "https://via.placeholder.com/300x200/10b981/ffffff?text=iPhone+Ad"
    },
    {
        id: 3,
        brandId: 3,
        brandName: "Starbucks咖啡",
        brandIndustry: "餐饮",
        title: "星巴克新品",
        description: "品味生活，享受咖啡时光",
        type: "image",
        typeText: "图片",
        activity: "是",
        device: "iOS",
        position: "详情页",
        status: "online",
        statusText: "在线",
        onlineTime: "2024-01-20 09:00:00 至 2024-03-20 09:00:00",
        exposureControl: "3次/天/用户",
        peerControl: "2个广告位",
        startDate: "2024-01-20 09:00:00",
        endDate: "2024-03-20 09:00:00",
        region: "全国",
        priority: 3,
        deviceType: "iOS",
        link: "https://starbucks.com/new",
        material: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Starbucks+Ad"
    },
    {
        id: 4,
        brandId: 4,
        brandName: "Tesla汽车",
        brandIndustry: "汽车",
        title: "Tesla Model S",
        description: "未来已来，电动驾驶新体验",
        type: "video",
        typeText: "视频",
        activity: "否",
        device: "Android",
        position: "信息流",
        status: "online",
        statusText: "在线",
        onlineTime: "2024-01-25 16:00:00 至 2024-04-25 16:00:00",
        exposureControl: "10次/天/用户",
        peerControl: "5个广告位",
        startDate: "2024-01-25 16:00:00",
        endDate: "2024-04-25 16:00:00",
        region: "全国",
        priority: 1,
        deviceType: "Android",
        link: "https://tesla.com/models",
        material: "https://via.placeholder.com/300x200/ef4444/ffffff?text=Tesla+Ad"
    }
];

// 全局变量
let currentAds = [...mockAds];
let filteredAds = [...mockAds];
let currentAd = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAdList();
    loadAdData();
    setupEventListeners();
});

// 初始化广告列表页面
function initializeAdList() {
    console.log('广告列表页面初始化完成');
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选器事件
    document.getElementById('status-filter').addEventListener('change', filterAds);
    document.getElementById('brand-filter').addEventListener('input', filterAds);
    document.getElementById('type-filter').addEventListener('change', filterAds);
    document.getElementById('activity-filter').addEventListener('change', filterAds);
    document.getElementById('device-filter').addEventListener('change', filterAds);
    document.getElementById('position-filter').addEventListener('change', filterAds);
    
    // 导航事件 - 处理锚点链接和页面跳转
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是锚点链接（以#开头），阻止默认行为并处理
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = href.substring(1);
                navigateToPage(target);
            }
            // 如果是页面链接，让浏览器正常跳转
            // 不需要阻止默认行为，让浏览器处理页面跳转
        });
    });
}

// 加载广告数据
function loadAdData() {
    renderAdTable(filteredAds);
}

// 渲染广告表格
function renderAdTable(ads) {
    const tbody = document.getElementById('ad-table-body');
    tbody.innerHTML = '';
    
    if (ads.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <div class="empty-icon">📭</div>
                    <div class="empty-title">暂无数据</div>
                    <div class="empty-description">没有找到匹配的广告数据</div>
                </td>
            </tr>
        `;
        return;
    }
    
    ads.forEach(ad => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="status-badge status-${ad.status}">${ad.statusText}</span>
            </td>
            <td>${ad.brandName}</td>
            <td>${ad.typeText}</td>
            <td>${ad.activity}</td>
            <td>${ad.device}</td>
            <td>${ad.onlineTime}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewAd(${ad.id})">查看</button>
                    ${ad.status === 'online' ? 
                        `<button class="action-btn offline" onclick="offlineAd(${ad.id})">下线</button>` :
                        `<button class="action-btn view" onclick="onlineAd(${ad.id})">上线</button>`
                    }
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 筛选广告
function filterAds() {
    const statusFilter = document.getElementById('status-filter').value;
    const brandFilter = document.getElementById('brand-filter').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const activityFilter = document.getElementById('activity-filter').value;
    const deviceFilter = document.getElementById('device-filter').value;
    const positionFilter = document.getElementById('position-filter').value;
    
    filteredAds = currentAds.filter(ad => {
        const statusMatch = !statusFilter || ad.status === statusFilter;
        const brandMatch = !brandFilter || ad.brandName.toLowerCase().includes(brandFilter);
        const typeMatch = !typeFilter || ad.type === typeFilter;
        const activityMatch = !activityFilter || ad.activity === activityFilter;
        const deviceMatch = !deviceFilter || ad.device === deviceFilter;
        const positionMatch = !positionFilter || ad.position === positionFilter;
        
        return statusMatch && brandMatch && typeMatch && activityMatch && deviceMatch && positionMatch;
    });
    
    renderAdTable(filteredAds);
}

// 查看广告详情
function viewAd(adId) {
    const ad = currentAds.find(a => a.id === adId);
    if (!ad) return;
    
    currentAd = ad;
    
    const content = document.getElementById('ad-detail-content');
    content.innerHTML = `
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">品牌名称</div>
                    <div class="detail-value">${ad.brandName}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">品牌行业</div>
                    <div class="detail-value">${ad.brandIndustry}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">广告标题</div>
                    <div class="detail-value">${ad.title}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">广告文案</div>
                    <div class="detail-value">${ad.description}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">活动</div>
                    <div class="detail-value">${ad.activity}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">资源位置</div>
                    <div class="detail-value">${ad.position}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">曝光频控</div>
                    <div class="detail-value">${ad.exposureControl}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">同行频控</div>
                    <div class="detail-value">${ad.peerControl}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">投放日期</div>
                    <div class="detail-value">${ad.onlineTime}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">地域定向</div>
                    <div class="detail-value">${ad.region}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">优先级</div>
                    <div class="detail-value">${ad.priority}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">设备类型</div>
                    <div class="detail-value">${ad.deviceType}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">广告类型</div>
                    <div class="detail-value">${ad.typeText}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">跳转链接</div>
                    <div class="detail-value">${ad.link}</div>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>广告素材</h4>
            <div class="ad-preview">
                <div class="preview-header">
                    <img src="https://via.placeholder.com/40x40/3b82f6/ffffff?text=${ad.brandName.charAt(0)}" 
                         alt="品牌Logo" class="preview-logo">
                    <div>
                        <div class="preview-brand">${ad.brandName}</div>
                        <div class="preview-industry">${ad.brandIndustry}</div>
                    </div>
                </div>
                <div class="preview-content">
                    <div class="preview-title">${ad.title}</div>
                    <div class="preview-description">${ad.description}</div>
                    <div class="preview-media">
                        ${ad.type === 'video' ? 
                            `<video src="${ad.material}" controls style="width: 100%; max-height: 200px;"></video>` :
                            `<img src="${ad.material}" alt="广告素材" style="width: 100%; max-height: 200px; object-fit: cover;">`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('ad-detail-drawer').classList.add('open');
}

// 下线广告
function offlineAd(adId) {
    const ad = currentAds.find(a => a.id === adId);
    if (!ad) return;
    
    currentAd = ad;
    
    showConfirmModal(
        '广告下线',
        `确定下线该广告吗？下线后，该广告将立刻停止投放。即使恢复上线，也会因资源问题影响广告曝光。`,
        () => {
            // 模拟下线操作
            ad.status = 'offline';
            ad.statusText = '下线';
            loadAdData();
            closeModal();
            showToast('广告下线成功');
        }
    );
}

// 上线广告
function onlineAd(adId) {
    const ad = currentAds.find(a => a.id === adId);
    if (!ad) return;
    
    currentAd = ad;
    
    // 检查品牌状态
    if (ad.brandStatus === 'inactive') {
        showToast('该广告所属品牌为停用状态，请先上线品牌。', 'error');
        return;
    }
    
    // 检查投放时间
    const now = new Date();
    const startDate = new Date(ad.startDate);
    const endDate = new Date(ad.endDate);
    
    if (now < startDate || now > endDate) {
        showToast('当前不属于该广告的投放时间范围内，请确认。', 'error');
        return;
    }
    
    showConfirmModal(
        '广告上线',
        `确定上线该广告吗？`,
        () => {
            // 模拟上线操作
            ad.status = 'online';
            ad.statusText = '在线';
            loadAdData();
            closeModal();
            showToast('广告上线成功');
        }
    );
}

// 创建广告
function createAd() {
    window.location.href = 'ad-config.html';
}

// 显示确认弹窗
function showConfirmModal(title, message, onConfirm) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('confirm-modal').classList.add('show');
    
    // 存储确认回调
    window.confirmCallback = onConfirm;
}

// 确认操作
function confirmAction() {
    if (window.confirmCallback) {
        window.confirmCallback();
    }
}

// 关闭弹窗
function closeModal() {
    document.getElementById('confirm-modal').classList.remove('show');
    window.confirmCallback = null;
}

// 关闭抽屉
function closeDrawer() {
    document.getElementById('ad-detail-drawer').classList.remove('open');
}

// 导航到页面
function navigateToPage(page) {
    console.log('导航到页面:', page);
    // 这里可以实现页面切换逻辑
    showToast(`导航到 ${page} 页面`);
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗和抽屉
    if (e.key === 'Escape') {
        closeModal();
        closeDrawer();
    }
    
    // Ctrl+N 新建广告
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createAd();
    }
});

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 防抖处理筛选
const debouncedFilter = debounce(filterAds, 300);
document.getElementById('brand-filter').addEventListener('input', debouncedFilter); 