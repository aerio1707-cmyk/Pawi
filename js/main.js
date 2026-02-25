/**
 * Pawi (派怡) 官方網站核心互動邏輯
 * 包含：手機版選單、捲動特效、平滑捲動
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;

    if (menuToggle && navMenu && menuOverlay) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open'); // 新增：控制主體模糊

            const icon = menuToggle.querySelector('i');
            if (isActive) {
                icon.classList.replace('fa-bars', 'fa-times');
                body.style.overflow = 'hidden';
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                body.style.overflow = '';
            }
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        menuOverlay.addEventListener('click', toggleMenu);

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }
});

/**
 * Pawi 網站主要互動邏輯
 * 維護者: 網頁開發工程師
 */

// --- 4. 產品分類過濾 (新增) ---
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

// 優化後的產品分類過濾
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            // 先將所有卡片透明度設為 0
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // 延遲一點點讓 display: block 生效後再執行透明度動畫
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'all 0.4s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            }, 300); // 等待縮小動畫完成
        });
    });
});

/* 產品詳情頁 - 頁籤切換功能
 * @param {Event} evt - 點擊事件
 * @param {string} tabName - 要開啟的內容 ID
*/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // 1. 隱藏所有頁籤內容
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 2. 移除所有按鈕的 active 類別
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 3. 顯示當前選中的內容，並為按鈕加上 active
    document.getElementById(tabName).style.display = "block";
    setTimeout(function() {
        document.getElementById(tabName).classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}

// 原本的 DOMContentLoaded 保留處理其他邏輯
document.addEventListener('DOMContentLoaded', function() {
    console.log("Pawi 網頁載入成功！");
    // 其他如行動版選單、捲動監聽等邏輯...
});

/**
 * Pawi 檢驗報告放大功能 (Lightbox)
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Lightbox 放大功能修正 ---
    const modal = document.getElementById("pawiLightbox");
    const modalImg = document.getElementById("imgFullView");
    const captionText = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".modal-close");

    // 抓取 report-preview-card 下的所有圖片
    const reportImgs = document.querySelectorAll(".report-preview-card img");

    if (modal && reportImgs.length > 0) {
        reportImgs.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
                console.log("Lightbox 已開啟: " + this.src); // 偵錯用
            });
        });
    }

    // 關閉邏輯
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }
    
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = "none";
        };
    }

    // --- 2. 頁籤切換邏輯 (保留全域 openTab 以供 HTML onclick 呼叫) ---
});

// 頁籤函式放在全域，確保 HTML onclick="openTab(...)" 找得到
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const target = document.getElementById(tabName);
    if (target) {
        target.style.display = "block";
        setTimeout(() => target.classList.add("active"), 10);
    }
    evt.currentTarget.classList.add("active");
}