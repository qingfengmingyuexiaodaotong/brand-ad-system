// 品牌配置页面JavaScript

// 全局变量
let uploadedLogo = null;
let formData = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeBrandConfig();
    setupEventListeners();
});

// 初始化品牌配置页面
function initializeBrandConfig() {
    console.log('品牌配置页面初始化完成');
    
    // 设置默认预览
    updatePreview();
}

// 设置事件监听器
function setupEventListeners() {
    // 表单输入事件
    document.getElementById('brand-name').addEventListener('input', updatePreview);
    document.getElementById('brand-industry').addEventListener('change', updatePreview);
    document.getElementById('exposure-control').addEventListener('change', updatePreview);
    document.getElementById('brand-description').addEventListener('input', updatePreview);
    
    // Logo上传事件
    document.getElementById('logo-upload').addEventListener('click', triggerFileUpload);
    document.getElementById('logo-file').addEventListener('change', handleFileUpload);
    
    // 拖拽上传
    const uploadArea = document.getElementById('logo-upload');
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    
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

// 触发文件上传
function triggerFileUpload() {
    document.getElementById('logo-file').click();
}

// 处理文件上传
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    const allowedTypes = ['image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
        showToast('请上传PNG、GIF、WebP或SVG格式的图片', 'error');
        return;
    }
    
    // 验证文件大小（500KB）
    if (file.size > 500 * 1024) {
        showToast('图片大小不能超过500KB', 'error');
        return;
    }
    
    // 验证图片尺寸
    const img = new Image();
    img.onload = function() {
        if (this.width > 500 || this.height > 500) {
            showToast('图片尺寸不能超过500x500像素', 'error');
            return;
        }
        
        // 文件验证通过，显示预览
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedLogo = e.target.result;
            showLogoPreview(uploadedLogo);
            updatePreview();
        };
        reader.readAsDataURL(file);
    };
    img.src = URL.createObjectURL(file);
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
        const input = document.getElementById('logo-file');
        input.files = files;
        handleFileUpload({ target: { files: files } });
    }
}

// 显示Logo预览
function showLogoPreview(src) {
    const preview = document.getElementById('logo-preview');
    const previewImg = document.getElementById('logo-preview-img');
    const uploadArea = document.getElementById('logo-upload');
    
    previewImg.src = src;
    preview.style.display = 'block';
    uploadArea.style.display = 'none';
}

// 重置Logo上传
function resetLogoUpload() {
    const preview = document.getElementById('logo-preview');
    const uploadArea = document.getElementById('logo-upload');
    
    preview.style.display = 'none';
    uploadArea.style.display = 'block';
    uploadedLogo = null;
}

// 更新预览
function updatePreview() {
    const brandName = document.getElementById('brand-name').value || '品牌名称';
    const brandIndustry = document.getElementById('brand-industry');
    const industryText = brandIndustry.options[brandIndustry.selectedIndex]?.text || '行业分类';
    const description = document.getElementById('brand-description').value || '广告描述信息';
    
    // 更新预览内容
    document.getElementById('preview-brand').textContent = brandName;
    document.getElementById('preview-industry').textContent = industryText;
    document.getElementById('preview-title').textContent = `${brandName}广告`;
    document.getElementById('preview-description').textContent = description;
    
    // 更新Logo预览
    if (uploadedLogo) {
        document.getElementById('preview-logo').src = uploadedLogo;
    }
    
    // 保存表单数据
    formData = {
        name: brandName,
        industry: brandIndustry.value,
        industryText: industryText,
        exposureControl: document.getElementById('exposure-control').value,
        description: description,
        logo: uploadedLogo
    };
}

// 验证表单
function validateForm() {
    const brandName = document.getElementById('brand-name').value.trim();
    const brandIndustry = document.getElementById('brand-industry').value;
    const exposureControl = document.getElementById('exposure-control').value;
    
    if (!brandName) {
        showToast('请输入品牌名称', 'error');
        return false;
    }
    
    if (brandName.length > 10) {
        showToast('品牌名称不能超过10个汉字', 'error');
        return false;
    }
    
    if (!brandIndustry) {
        showToast('请选择品牌行业', 'error');
        return false;
    }
    
    if (!exposureControl) {
        showToast('请选择曝光频控', 'error');
        return false;
    }
    
    if (!uploadedLogo) {
        showToast('请上传品牌Logo', 'error');
        return false;
    }
    
    return true;
}

// 保存品牌
function saveBrand() {
    if (!validateForm()) {
        return;
    }
    
    // 显示确认弹窗
    showConfirmModal(
        '确认创建品牌',
        `确定要创建品牌"${formData.name}"吗？创建后将无法修改品牌名称。`,
        () => {
            // 模拟保存操作
            const newBrand = {
                id: Date.now(),
                name: formData.name,
                industry: formData.industry,
                industryText: formData.industryText,
                status: 'active',
                statusText: '可用',
                createTime: new Date().toLocaleString('zh-CN'),
                logo: uploadedLogo,
                exposureControl: getExposureControlText(formData.exposureControl),
                description: formData.description
            };
            
            // 这里可以调用API保存数据
            console.log('保存品牌数据:', newBrand);
            
            showToast('品牌创建成功', 'success');
            
            // 延迟跳转回列表页
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    );
}

// 获取曝光频控文本
function getExposureControlText(value) {
    const controlMap = {
        '1': '1次/天/用户',
        '3': '3次/天/用户',
        '5': '5次/天/用户',
        '10': '10次/天/用户',
        'unlimited': '不限'
    };
    return controlMap[value] || value;
}

// 取消配置
function cancelConfig() {
    // 检查是否有未保存的更改
    const hasChanges = document.getElementById('brand-name').value ||
                      document.getElementById('brand-industry').value ||
                      document.getElementById('exposure-control').value ||
                      document.getElementById('brand-description').value ||
                      uploadedLogo;
    
    if (hasChanges) {
        showConfirmModal(
            '确认取消',
            '您有未保存的更改，确定要取消吗？',
            () => {
                window.location.href = 'index.html';
            }
        );
    } else {
        window.location.href = 'index.html';
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
        saveBrand();
    }
    
    // ESC 取消
    if (e.key === 'Escape') {
        cancelConfig();
    }
});

// 页面卸载前检查
window.addEventListener('beforeunload', function(e) {
    const hasChanges = document.getElementById('brand-name').value ||
                      document.getElementById('brand-industry').value ||
                      document.getElementById('exposure-control').value ||
                      document.getElementById('brand-description').value ||
                      uploadedLogo;
    
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
document.getElementById('brand-name').addEventListener('input', debouncedUpdatePreview);
document.getElementById('brand-description').addEventListener('input', debouncedUpdatePreview); 