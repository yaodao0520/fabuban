// 打赏功能相关脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化打赏功能
    initDonateFeature();
});

/**
 * 初始化打赏功能
 */
function initDonateFeature() {
    // 获取打赏按钮和弹窗元素
    const donateBtn = document.getElementById('donateBtn');
    const donateModal = document.getElementById('donateModal');
    
    // 点击打赏按钮显示弹窗
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openDonateModal();
        });
    }
    
    // 点击关闭按钮隐藏弹窗
    const closeBtn = document.getElementById('donateCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeDonateModal();
        });
    }
    
    // 点击弹窗背景关闭弹窗
    if (donateModal) {
        donateModal.addEventListener('click', function(e) {
            if (e.target === donateModal) {
                closeDonateModal();
            }
        });
    }
}

/**
 * 打开打赏弹窗
 */
function openDonateModal() {
    const donateModal = document.getElementById('donateModal');
    if (donateModal) {
        // 确保弹窗可见
        donateModal.style.display = 'flex';
        // 短暂延迟添加动画类，确保display生效
        setTimeout(() => {
            donateModal.classList.remove('hide');
            donateModal.classList.add('show');
            // 阻止背景滚动
            document.body.style.overflow = 'hidden';
        }, 10);
    }
}

/**
 * 关闭打赏弹窗
 */
function closeDonateModal() {
    const donateModal = document.getElementById('donateModal');
    if (donateModal) {
        donateModal.classList.remove('show');
        donateModal.classList.add('hide');
        // 延迟后隐藏弹窗并恢复背景滚动
        setTimeout(() => {
            donateModal.classList.remove('hide');
            donateModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}
