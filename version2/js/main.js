// 传统企业级品牌广告营销系统 - 主要JavaScript文件

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
        logo: "https://via.placeholder.com/80x80/3498db/ffffff?text=N",
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
        logo: "https://via.placeholder.com/80x80/27ae60/ffffff?text=A",
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
        logo: "https://via.placeholder.com/80x80/f39c12/ffffff?text=S",
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
        logo: "https://via.placeholder.com/80x80/e74c3c/ffffff?text=T",
        exposureControl: "10次/天/用户",
        description: "电动汽车制造商"
    }
];

// 全局变量
let currentBrands = [...mockBrands];
let filteredBrands = [...mockBrands];
let currentBrand = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    loadBrandData();
    setupEventListeners();
});

// 初始化系统
function initializeSystem() {
    console.log('品牌广告营销系统企业版初始化完成');
    
    // 更新统计数据
    updateStatistics();
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选器事件
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    document.getElementById('industry-filter').addEventListener('change', applyFilters);
    document.getElementById('search-input').addEventListener('input', debounce(applyFilters, 300));
    
    // 全选复选框
    document.getElementById('select-all').addEventListener('change', toggleSelectAll);
    
    // 导航事件
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            navigateToPage(target);
        });
    });
}

// 加载品牌数据
function loadBrandData() {
    renderBrandTable(filteredBrands);
    updateTableCount();
}

// 渲染品牌表格
function renderBrandTable(brands) {
    const tbody = document.getElementById('brand-table-body');
    tbody.innerHTML = '';
    
    if (brands.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
                    <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">暂无数据</div>
                    <div style="font-size: 14px;">没有找到匹配的品牌数据</div>
                </td>
            </tr>
        `;
        return;
    }
    
    brands.forEach(brand => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" class="brand-checkbox" value="${brand.id}">
            </td>
            <td>
                <span class="status-badge status-${brand.status}">${brand.statusText}</span>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${brand.logo}" alt="${brand.name}" style="width: 32px; height: 32px; border-radius: 4px;">
                    <span>${brand.name}</span>
                </div>
            </td>
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

// 应用筛选
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const industryFilter = document.getElementById('industry-filter').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    filteredBrands = currentBrands.filter(brand => {
        const statusMatch = !statusFilter || brand.status === statusFilter;
        const industryMatch = !industryFilter || brand.industry === industryFilter;
        const searchMatch = !searchInput || brand.name.toLowerCase().includes(searchInput);
        
        return statusMatch && industryMatch && searchMatch;
    });
    
    renderBrandTable(filteredBrands);
    updateTableCount();
}

// 重置筛选
function resetFilters() {
    document.getElementById('status-filter').value = '';
    document.getElementById('industry-filter').value = '';
    document.getElementById('search-input').value = '';
    
    filteredBrands = [...currentBrands];
    renderBrandTable(filteredBrands);
    updateTableCount();
}

// 更新表格计数
function updateTableCount() {
    const count = filteredBrands.length;
    document.querySelector('.table-count').textContent = `共 ${count} 条记录`;
}

// 查看品牌详情
function viewBrand(brandId) {
    const brand = currentBrands.find(b => b.id === brandId);
    if (!brand) return;
    
    currentBrand = brand;
    
    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0;">基本信息</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">品牌名称</label>
                    <div style="font-size: 14px; color: #333; font-weight: 500; margin-top: 4px;">${brand.name}</div>
                </div>
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">品牌行业</label>
                    <div style="font-size: 14px; color: #333; font-weight: 500; margin-top: 4px;">${brand.industryText}</div>
                </div>
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">创建时间</label>
                    <div style="font-size: 14px; color: #333; font-weight: 500; margin-top: 4px;">${brand.createTime}</div>
                </div>
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">曝光频控</label>
                    <div style="font-size: 14px; color: #333; font-weight: 500; margin-top: 4px;">${brand.exposureControl}</div>
                </div>
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">品牌状态</label>
                    <div style="margin-top: 4px;">
                        <span class="status-badge status-${brand.status}">${brand.statusText}</span>
                    </div>
                </div>
                <div>
                    <label style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">品牌Logo</label>
                    <div style="margin-top: 4px;">
                        <img src="${brand.logo}" alt="${brand.name}" style="width: 60px; height: 60px; border-radius: 6px; border: 1px solid #e0e0e0;">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h4 style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e0e0e0;">品牌描述</h4>
            <p style="color: #666; line-height: 1.6;">${brand.description}</p>
        </div>
    `;
    
    document.getElementById('detail-sidebar').classList.add('open');
}

// 下线品牌
function offlineBrand(brandId) {
    const brand = currentBrands.find(b => b.id === brandId);
    if (!brand) return;
    
    currentBrand = brand;
    
    showConfirmModal(
        '品牌下线',
        `确定下线品牌"${brand.name}"吗？下线后，该品牌下所有广告将立刻停止投放。即使恢复上线品牌，历史广告也无法自动恢复，需重新配置。`,
        () => {
            // 模拟下线操作
            brand.status = 'inactive';
            brand.statusText = '停用';
            loadBrandData();
            closeModal();
            showNotification('品牌下线成功', 'success');
        }
    );
}

// 创建品牌
function createBrand() {
    showNotification('跳转到品牌配置页面', 'info');
    // 这里可以跳转到品牌配置页面
}

// 导出数据
function exportData() {
    showNotification('数据导出功能开发中', 'info');
}

// 刷新表格
function refreshTable() {
    showNotification('数据已刷新', 'success');
    loadBrandData();
}

// 切换全选
function toggleSelectAll() {
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.brand-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// 导航到页面
function navigateToPage(page) {
    console.log('导航到页面:', page);
    showNotification(`导航到 ${page} 页面`, 'info');
}

// 更新统计数据
function updateStatistics() {
    // 这里可以添加实时数据更新逻辑
    console.log('更新统计数据');
}

// 显示确认弹窗
function showConfirmModal(title, message, onConfirm) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal-overlay').classList.add('show');
    
    // 存储确认回调
    window.confirmCallback = onConfirm;
}

// 确认操作
function confirmAction() {
    if (window.confirmCallback) {
        window.confirmCallback();
    }
    closeModal();
}

// 关闭弹窗
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
    window.confirmCallback = null;
}

// 关闭详情侧边栏
function closeDetailSidebar() {
    document.getElementById('detail-sidebar').classList.remove('open');
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗和侧边栏
    if (e.key === 'Escape') {
        closeModal();
        closeDetailSidebar();
    }
    
    // Ctrl+N 新建品牌
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createBrand();
    }
    
    // Ctrl+F 聚焦搜索框
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search-input').focus();
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

function formatDate(date) {
    return new Date(date).toLocaleString('zh-CN');
}

function formatNumber(num) {
    return num.toLocaleString('zh-CN');
}

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    console.log('页面卸载，清理资源');
}); 