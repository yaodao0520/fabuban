/**
 * 全屏桥接模块 - 处理DPlayer全屏事件与Android WebView交互
 */
(function() {
    // 检测是否在Android WebView环境中运行
    function isInAndroidWebView() {
        return typeof window.AndroidApp !== 'undefined';
    }
    
    // 设置DPlayer全屏事件监听
    function setupFullscreenBridge(dp) {
        if (!dp) return false;
        
        console.log('设置全屏桥接...');
        
        // 监听DPlayer的全屏切换事件
        dp.on('fullscreen', function() {
            console.log('DPlayer全屏事件触发');
            if (isInAndroidWebView() && typeof window.AndroidApp.onFullscreenButtonClicked === 'function') {
                window.AndroidApp.onFullscreenButtonClicked();
            }
        });
        
        // 监听DPlayer的退出全屏事件
        dp.on('fullscreen_cancel', function() {
            console.log('DPlayer退出全屏事件触发');
            if (isInAndroidWebView() && typeof window.AndroidApp.onExitFullscreenButtonClicked === 'function') {
                window.AndroidApp.onExitFullscreenButtonClicked();
            }
        });
        
        // 增强全屏按钮点击处理
        setTimeout(function() {
            const fullscreenBtn = document.querySelector('.dplayer-full');
            if (fullscreenBtn) {
                const originalClickHandler = fullscreenBtn.onclick;
                fullscreenBtn.onclick = function(e) {
                    if (isInAndroidWebView()) {
                        if (dp.fullScreen.isFullScreen()) {
                            window.AndroidApp.onExitFullscreenButtonClicked();
                        } else {
                            window.AndroidApp.onFullscreenButtonClicked();
                        }
                    } else if (originalClickHandler) {
                        originalClickHandler.call(this, e);
                    }
                };
            }
        }, 2000);
        
        return true;
    }
    
    // 导出公共API
    window.FullscreenBridge = {
        setup: setupFullscreenBridge
    };
})();
