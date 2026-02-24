/**
 * Pawi (派怡) 官方網站核心互動邏輯
 * 包含：手機版選單、捲動特效、平滑捲動
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 手機版漢堡選單邏輯 ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    if (menuToggle && navMenu && menuOverlay) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // 切換圖示：選單打開時變為 X (fa-times)，關閉回歸三條線 (fa-bars)
            const icon = menuToggle.querySelector('i');
            if (isActive) {
                icon.classList.replace('fa-bars', 'fa-times');
                body.style.overflow = 'hidden'; // 防止背景捲動
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                body.style.overflow = ''; // 恢復捲動
            }
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // 點擊遮罩層關閉
        menuOverlay.addEventListener('click', toggleMenu);

        // 點擊選單內的連結後自動關閉選單 (優化使用者體驗)
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // --- 2. 滾動監聽：導覽列縮減與陰影 ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '5px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 15px rgba(255, 157, 66, 0.1)';
        } else {
            navbar.style.padding = '10px 0';
            navbar.style.background = '#FFFFFF';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // --- 3. 平滑捲動 (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log("Pawi 系統核心邏輯載入完畢！");
});