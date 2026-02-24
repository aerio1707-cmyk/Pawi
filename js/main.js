/**
 * Pawi (派怡) 官方網站核心互動邏輯
 * 包含：手機版選單、捲動特效、產品過濾、頁籤切換
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

        menuToggle.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // 點擊選單連結後自動關閉選單 (優化使用者體驗)
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
            navbar.classList.add('scrolled'); // 建議在 CSS 加入 .navbar.scrolled 樣式
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 15px rgba(255, 157, 66, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '15px 0';
            navbar.style.background = '#FFFFFF';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // --- 3. 平滑捲動 (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
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

    // --- 4. 產品分類過濾 (首頁專用) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 切換按鈕樣式
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    // 轉場動畫：先縮小淡出
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    card.style.transition = 'all 0.3s ease';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    console.log("Pawi 系統核心邏輯載入完畢！");
});

/**
 * 5. 產品詳情頁 - 頁籤切換功能 (需放在全域供 HTML onclick 呼叫)
 */
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    // 隱藏所有內容
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 移除所有按鈕 active 狀態
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 顯示選中內容並加入動畫
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
        setTimeout(() => {
            targetTab.classList.add("active");
        }, 10);
        evt.currentTarget.classList.add("active");
    }
}