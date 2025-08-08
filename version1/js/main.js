// 品牌广告营销系统 - 主要JavaScript文件

// 模拟数据
const mockBrands = [
    {
        id: 1,
        name: "Nike运动",
        industry: "fashion",
        industryText: "时尚",
        status: "active",
        statusText: "可用",
        createTime: "2024-01-15 10:30:00",
        logo: "https://via.placeholder.com/80x80/3b82f6/ffffff?text=N",
        exposureControl: "3次/天/用户",
        description: "全球领先的运动品牌"
    },
    {
        id: 2,
        name: "Apple科技",
        industry: "tech",
        industryText: "科技",
        status: "active",
        statusText: "可用",
        createTime: "2024-01-10 14:20:00",
        logo: "https://via.placeholder.com/80x80/10b981/ffffff?text=A",
        exposureControl: "5次/天/用户",
        description: "创新科技产品制造商"
    },
    {
        id: 3,
        name: "Starbucks咖啡",
        industry: "food",
        industryText: "餐饮",
        status: "inactive",
        statusText: "停用",
        createTime: "2024-01-05 09:15:00",
        logo: "https://via.placeholder.com/80x80/f59e0b/ffffff?text=S",
        exposureControl: "1次/天/用户",
        description: "全球连锁咖啡品牌"
    },
    {
        id: 4,
        name: "Tesla汽车",
        industry: "auto",
        industryText: "汽车",
        status: "active",
        statusText: "可用",
        createTime: "2024-01-20 16:45:00",
        logo: "https://via.placeholder.com/80x80/ef4444/ffffff?text=T",
        exposureControl: "10次/天/用户",
        description: "电动汽车制造商"
    }
];

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
    }
];

// 全局变量
let currentBrand = null;
let currentAd = null;
let filteredBrands = [...mockBrands];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadBrandData();
    setupEventListeners();
});

// 初始化页面
function initializePage() {
    console.log('品牌广告营销系统初始化完成');
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选器事件
    document.getElementById('status-filter').addEventListener('change', filterBrands);
    document.getElementById('name-filter').addEventListener('input', filterBrands);
    document.getElementById('industry-filter').addEventListener('change', filterBrands);
    
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

// 加载品牌数据
function loadBrandData() {
    renderBrandTable(filteredBrands);
}

// 渲染品牌表格
function renderBrandTable(brands) {
    const tbody = document.getElementById('brand-table-body');
    tbody.innerHTML = '';
    
    if (brands.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <div class="empty-icon">📭</div>
                    <div class="empty-title">暂无数据</div>
                    <div class="empty-description">没有找到匹配的品牌数据</div>
                </td>
            </tr>
        `;
        return;
    }
    
    brands.forEach(brand => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="status-badge status-${brand.status}">${brand.statusText}</span>
            </td>
            <td>${brand.name}</td>
            <td>${brand.industryText}</td>
            <td>${brand.createTime}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewBrand(${brand.id})">查看</button>
                    <button class="action-btn offline" onclick="offlineBrand(${brand.id})">下线</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 筛选品牌
function filterBrands() {
    const statusFilter = document.getElementById('status-filter').value;
    const nameFilter = document.getElementById('name-filter').value.toLowerCase();
    const industryFilter = document.getElementById('industry-filter').value;
    
    filteredBrands = mockBrands.filter(brand => {
        const statusMatch = !statusFilter || brand.status === statusFilter;
        const nameMatch = !nameFilter || brand.name.toLowerCase().includes(nameFilter);
        const industryMatch = !industryFilter || brand.industry === industryFilter;
        
        return statusMatch && nameMatch && industryMatch;
    });
    
    renderBrandTable(filteredBrands);
}

// 查看品牌详情
function viewBrand(brandId) {
    const brand = mockBrands.find(b => b.id === brandId);
    if (!brand) return;
    
    currentBrand = brand;
    
    const content = document.getElementById('brand-detail-content');
    content.innerHTML = `
        <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">品牌名称</div>
                    <div class="detail-value">${brand.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">品牌行业</div>
                    <div class="detail-value">${brand.industryText}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">创建时间</div>
                    <div class="detail-value">${brand.createTime}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">曝光频控</div>
                    <div class="detail-value">${brand.exposureControl}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">品牌状态</div>
                    <div class="detail-value">
                        <span class="status-badge status-${brand.status}">${brand.statusText}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">品牌Logo</div>
                    <div class="detail-value">
                        <img src="${brand.logo}" alt="${brand.name}" class="detail-value brand-logo">
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>品牌描述</h4>
            <p>${brand.description}</p>
        </div>
    `;
    
    document.getElementById('brand-detail-drawer').classList.add('open');
}

// 下线品牌
function offlineBrand(brandId) {
    const brand = mockBrands.find(b => b.id === brandId);
    if (!brand) return;
    
    currentBrand = brand;
    
    showConfirmModal(
        '品牌下线',
        `确定下线品牌 ${brand.name} 吗？下线后，该品牌下所有广告将立刻停止投放。即使恢复上线品牌，历史广告也无法自动恢复，需重新配置。`,
        () => {
            // 模拟下线操作
            brand.status = 'inactive';
            brand.statusText = '停用';
            loadBrandData();
            closeModal();
            showToast('品牌下线成功');
        }
    );
}

// 创建品牌
function createBrand() {
    window.location.href = 'brand-config.html';
}

// 导航到页面
function navigateToPage(page) {
    console.log('导航到页面:', page);
    // 这里可以实现页面切换逻辑
    showToast(`导航到 ${page} 页面`);
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
    document.getElementById('brand-detail-drawer').classList.remove('open');
}

// 显示提示消息
function showToast(message, type = 'info') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加样式
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
    
    // 显示动画
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 数据统计相关函数
function updateStats() {
    // 这里可以添加实时数据更新逻辑
    console.log('更新统计数据');
}

// 广告管理相关函数
function loadAdData() {
    // 加载广告数据
    console.log('加载广告数据');
}

// 品牌配置相关函数
function loadBrandConfig() {
    // 加载品牌配置
    console.log('加载品牌配置');
}

// 广告配置相关函数
function loadAdConfig() {
    // 加载广告配置
    console.log('加载广告配置');
}

// 导出数据
function exportData(type) {
    console.log('导出数据:', type);
    showToast('数据导出功能开发中');
}

// 导入数据
function importData() {
    console.log('导入数据');
    showToast('数据导入功能开发中');
}

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    // 清理资源
    console.log('页面卸载，清理资源');
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗和抽屉
    if (e.key === 'Escape') {
        closeModal();
        closeDrawer();
    }
    
    // Ctrl+N 新建品牌
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createBrand();
    }
});

// 工具函数
function formatDate(date) {
    return new Date(date).toLocaleString('zh-CN');
}

function formatNumber(num) {
    return num.toLocaleString('zh-CN');
}

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
const debouncedFilter = debounce(filterBrands, 300);
document.getElementById('name-filter').addEventListener('input', debouncedFilter); 