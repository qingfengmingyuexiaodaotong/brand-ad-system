// 广告配置页面JavaScript

// 品牌数据映射
const brandData = {
    '1': { name: 'Nike运动', industry: '时尚' },
    '2': { name: 'Apple科技', industry: '科技' },
    '3': { name: 'Starbucks咖啡', industry: '餐饮' },
    '4': { name: 'Tesla汽车', industry: '汽车' }
};

// 全局变量
let uploadedMaterial = null;
let formData = {};
let selectedPriority = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAdConfig();
    setupEventListeners();
});

// 初始化广告配置页面
function initializeAdConfig() {
    console.log('广告配置页面初始化完成');
    
    // 设置默认预览
    updatePreview();
}

// 设置事件监听器
function setupEventListeners() {
    // 表单输入事件
    document.getElementById('brand-select').addEventListener('change', handleBrandChange);
    document.getElementById('ad-title').addEventListener('input', updatePreview);
    document.getElementById('ad-description').addEventListener('input', updatePreview);
    document.getElementById('activity-select').addEventListener('change', updatePreview);
    document.getElementById('position-select').addEventListener('change', updatePreview);
    document.getElementById('exposure-control').addEventListener('change', updatePreview);
    document.getElementById('peer-control').addEventListener('change', updatePreview);
    document.getElementById('start-date').addEventListener('change', updatePreview);
    document.getElementById('end-date').addEventListener('change', updatePreview);
    document.getElementById('device-type').addEventListener('change', updatePreview);
    document.getElementById('ad-type').addEventListener('change', updatePreview);
    document.getElementById('ad-link').addEventListener('input', updatePreview);
    
    // 素材上传事件
    document.getElementById('material-upload').addEventListener('click', triggerFileUpload);
    document.getElementById('material-file').addEventListener('change', handleFileUpload);
    
    // 拖拽上传
    const uploadArea = document.getElementById('material-upload');
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    
    // 优先级选择
    document.querySelectorAll('.priority-option').forEach(option => {
        option.addEventListener('click', function() {
            selectPriority(this.dataset.value);
        });
    });
    
    // 地域搜索
    document.getElementById('region-search').addEventListener('input', handleRegionSearch);
    
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

// 处理品牌选择变化
function handleBrandChange() {
    const brandSelect = document.getElementById('brand-select');
    const brandIndustry = document.getElementById('brand-industry');
    const selectedBrand = brandSelect.value;
    
    if (selectedBrand && brandData[selectedBrand]) {
        brandIndustry.value = brandData[selectedBrand].industry;
    } else {
        brandIndustry.value = '';
    }
    
    updatePreview();
}

// 触发文件上传
function triggerFileUpload() {
    document.getElementById('material-file').click();
}

// 处理文件上传
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
        showToast('请上传图片或视频格式的文件', 'error');
        return;
    }
    
    // 验证文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
        showToast('文件大小不能超过10MB', 'error');
        return;
    }
    
    // 文件验证通过，显示预览
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedMaterial = e.target.result;
        showMaterialPreview(uploadedMaterial, isVideo);
        updatePreview();
    };
    reader.readAsDataURL(file);
}

// 处理拖拽悬停
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
}

// 处理文件拖拽
function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const input = document.getElementById('material-file');
        input.files = files;
        handleFileUpload({ target: { files: files } });
    }
}

// 显示素材预览
function showMaterialPreview(src, isVideo) {
    const preview = document.getElementById('material-preview');
    const previewContent = document.getElementById('material-preview-content');
    const uploadArea = document.getElementById('material-upload');
    
    if (isVideo) {
        previewContent.innerHTML = `<video src="${src}" controls style="max-width: 100%; max-height: 200px;"></video>`;
    } else {
        previewContent.innerHTML = `<img src="${src}" alt="素材预览" style="max-width: 100%; max-height: 200px; border-radius: 4px;">`;
    }
    
    preview.style.display = 'block';
    uploadArea.style.display = 'none';
}

// 选择优先级
function selectPriority(value) {
    // 清除之前的选择
    document.querySelectorAll('.priority-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 设置新的选择
    const selectedOption = document.querySelector(`[data-value="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        selectedPriority = value;
    }
    
    updatePreview();
}

// 处理地域搜索
function handleRegionSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const checkboxes = document.querySelectorAll('.region-checkbox input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.parentElement.textContent.toLowerCase();
        if (label.includes(searchTerm)) {
            checkbox.checked = true;
        }
    });
}

// 更新预览
function updatePreview() {
    const brandSelect = document.getElementById('brand-select');
    const selectedBrand = brandSelect.value;
    const brandName = selectedBrand && brandData[selectedBrand] ? brandData[selectedBrand].name : '品牌名称';
    const brandIndustry = selectedBrand && brandData[selectedBrand] ? brandData[selectedBrand].industry : '行业分类';
    const adTitle = document.getElementById('ad-title').value || '广告标题';
    const adDescription = document.getElementById('ad-description').value || '广告描述信息';
    const adType = document.getElementById('ad-type').value;
    
    // 更新预览内容
    document.getElementById('preview-brand').textContent = brandName;
    document.getElementById('preview-industry').textContent = brandIndustry;
    document.getElementById('preview-title').textContent = adTitle;
    document.getElementById('preview-description').textContent = adDescription;
    
    // 更新素材预览
    if (uploadedMaterial) {
        const isVideo = adType === 'video';
        if (isVideo) {
            document.getElementById('preview-media').innerHTML = `<video src="${uploadedMaterial}" controls style="width: 100%; max-height: 200px;"></video>`;
        } else {
            document.getElementById('preview-media').innerHTML = `<img src="${uploadedMaterial}" alt="广告素材" style="width: 100%; max-height: 200px; object-fit: cover;">`;
        }
    }
    
    // 保存表单数据
    formData = {
        brandId: selectedBrand,
        brandName: brandName,
        brandIndustry: brandIndustry,
        title: adTitle,
        description: adDescription,
        activity: document.getElementById('activity-select').value,
        position: document.getElementById('position-select').value,
        exposureControl: document.getElementById('exposure-control').value,
        peerControl: document.getElementById('peer-control').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
        deviceType: document.getElementById('device-type').value,
        adType: adType,
        link: document.getElementById('ad-link').value,
        priority: selectedPriority,
        material: uploadedMaterial
    };
}

// 验证表单
function validateForm() {
    const brandSelect = document.getElementById('brand-select').value;
    const adTitle = document.getElementById('ad-title').value.trim();
    const adDescription = document.getElementById('ad-description').value.trim();
    const activity = document.getElementById('activity-select').value;
    const position = document.getElementById('position-select').value;
    const exposureControl = document.getElementById('exposure-control').value;
    const peerControl = document.getElementById('peer-control').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const deviceType = document.getElementById('device-type').value;
    const adType = document.getElementById('ad-type').value;
    const adLink = document.getElementById('ad-link').value.trim();
    
    if (!brandSelect) {
        showToast('请选择品牌', 'error');
        return false;
    }
    
    if (!adTitle) {
        showToast('请输入广告标题', 'error');
        return false;
    }
    
    if (!adDescription) {
        showToast('请输入广告文案', 'error');
        return false;
    }
    
    if (!activity) {
        showToast('请选择活动', 'error');
        return false;
    }
    
    if (!position) {
        showToast('请选择资源位置', 'error');
        return false;
    }
    
    if (!exposureControl) {
        showToast('请选择曝光频控', 'error');
        return false;
    }
    
    if (!peerControl) {
        showToast('请选择同行频控', 'error');
        return false;
    }
    
    if (!startDate) {
        showToast('请选择投放开始时间', 'error');
        return false;
    }
    
    if (!endDate) {
        showToast('请选择投放结束时间', 'error');
        return false;
    }
    
    if (new Date(startDate) >= new Date(endDate)) {
        showToast('结束时间必须晚于开始时间', 'error');
        return false;
    }
    
    if (!deviceType) {
        showToast('请选择设备类型', 'error');
        return false;
    }
    
    if (!adType) {
        showToast('请选择广告类型', 'error');
        return false;
    }
    
    if (!adLink) {
        showToast('请输入跳转链接', 'error');
        return false;
    }
    
    if (!selectedPriority) {
        showToast('请选择优先级', 'error');
        return false;
    }
    
    if (!uploadedMaterial) {
        showToast('请上传广告素材', 'error');
        return false;
    }
    
    return true;
}

// 保存广告
function saveAd() {
    if (!validateForm()) {
        return;
    }
    
    // 显示确认弹窗
    showConfirmModal(
        '确认创建广告',
        `确定要创建广告"${formData.title}"吗？`,
        () => {
            // 模拟保存操作
            const newAd = {
                id: Date.now(),
                brandId: formData.brandId,
                brandName: formData.brandName,
                brandIndustry: formData.brandIndustry,
                title: formData.title,
                description: formData.description,
                type: formData.adType,
                typeText: formData.adType === 'image' ? '图片' : '视频',
                activity: formData.activity === 'yes' ? '是' : '否',
                device: formData.deviceType,
                position: formData.position,
                status: 'online',
                statusText: '在线',
                onlineTime: `${formData.startDate} 至 ${formData.endDate}`,
                exposureControl: getExposureControlText(formData.exposureControl),
                peerControl: getPeerControlText(formData.peerControl),
                startDate: formData.startDate,
                endDate: formData.endDate,
                region: '全国',
                priority: parseInt(formData.priority),
                deviceType: formData.deviceType,
                link: formData.link,
                material: uploadedMaterial
            };
            
            // 这里可以调用API保存数据
            console.log('保存广告数据:', newAd);
            
            showToast('广告创建成功', 'success');
            
            // 延迟跳转回列表页
            setTimeout(() => {
                window.location.href = 'ad-list.html';
            }, 1500);
        }
    );
}

// 获取曝光频控文本
function getExposureControlText(value) {
    const controlMap = {
        '5': '5次/天/用户',
        '8': '8次/天/用户',
        '10': '10次/天/用户',
        'unlimited': '不限'
    };
    return controlMap[value] || value;
}

// 获取同行频控文本
function getPeerControlText(value) {
    const controlMap = {
        '3': '3个广告位',
        '5': '5个广告位',
        '10': '10个广告位',
        'unlimited': '不限'
    };
    return controlMap[value] || value;
}

// 取消配置
function cancelConfig() {
    // 检查是否有未保存的更改
    const hasChanges = document.getElementById('brand-select').value ||
                      document.getElementById('ad-title').value ||
                      document.getElementById('ad-description').value ||
                      document.getElementById('activity-select').value ||
                      document.getElementById('position-select').value ||
                      document.getElementById('exposure-control').value ||
                      document.getElementById('peer-control').value ||
                      document.getElementById('start-date').value ||
                      document.getElementById('end-date').value ||
                      document.getElementById('device-type').value ||
                      document.getElementById('ad-type').value ||
                      document.getElementById('ad-link').value ||
                      selectedPriority ||
                      uploadedMaterial;
    
    if (hasChanges) {
        showConfirmModal(
            '确认取消',
            '您有未保存的更改，确定要取消吗？',
            () => {
                window.location.href = 'ad-list.html';
            }
        );
    } else {
        window.location.href = 'ad-list.html';
    }
}

// 显示确认弹窗
function showConfirmModal(title, message, onConfirm) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button class="btn btn-primary" onclick="confirmAction()">确认</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
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
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
    window.confirmCallback = null;
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
    // Ctrl+S 保存
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveAd();
    }
    
    // ESC 取消
    if (e.key === 'Escape') {
        cancelConfig();
    }
});

// 页面卸载前检查
window.addEventListener('beforeunload', function(e) {
    const hasChanges = document.getElementById('brand-select').value ||
                      document.getElementById('ad-title').value ||
                      document.getElementById('ad-description').value ||
                      document.getElementById('activity-select').value ||
                      document.getElementById('position-select').value ||
                      document.getElementById('exposure-control').value ||
                      document.getElementById('peer-control').value ||
                      document.getElementById('start-date').value ||
                      document.getElementById('end-date').value ||
                      document.getElementById('device-type').value ||
                      document.getElementById('ad-type').value ||
                      document.getElementById('ad-link').value ||
                      selectedPriority ||
                      uploadedMaterial;
    
    if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
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

// 防抖处理预览更新
const debouncedUpdatePreview = debounce(updatePreview, 300);
document.getElementById('ad-title').addEventListener('input', debouncedUpdatePreview);
document.getElementById('ad-description').addEventListener('input', debouncedUpdatePreview);
document.getElementById('ad-link').addEventListener('input', debouncedUpdatePreview); 