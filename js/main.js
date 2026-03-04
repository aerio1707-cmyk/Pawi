/**
 * ============================================================
 *  Pawi (派怡) 官方網站 — 核心互動邏輯
 *  版本：V2.0  整理優化版
 *
 *  功能模組：
 *    01. 漢堡選單（手機版側滑 + 遮罩）
 *    02. 產品分類過濾（含淡入動畫）
 *    03. 產品詳情頁籤切換（openTab）
 *    04. 檢驗報告 Lightbox 放大預覽
 * ============================================================
 */


/* ============================================================
   01. 漢堡選單
   - 點擊漢堡按鈕 → 側滑選單展開／收起
   - 點擊遮罩 → 關閉選單
   - 點擊選單內連結 → 自動關閉選單（手機版體驗優化）
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    const menuToggle  = document.getElementById('menuToggle');
    const navMenu     = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    /**
     * 切換選單開／關狀態
     */
    function toggleMenu() {
        if (!navMenu || !menuOverlay) return;

        const isActive = navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // 切換漢堡圖示（fa-bars ↔ fa-times）
        const icon = menuToggle ? menuToggle.querySelector('i') : null;
        if (icon) {
            icon.classList.toggle('fa-bars',  !isActive);
            icon.classList.toggle('fa-times',  isActive);
        }
    }

    // 漢堡按鈕點擊
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    // 遮罩點擊 → 關閉
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }

    // 選單內連結點擊 → 自動關閉
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================================
       02. 產品分類過濾
       - 點擊分類按鈕，對應 data-category 的卡片顯示
       - 切換時帶有縮放 + 淡入動畫
       ========================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards  = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {

        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {

                // 更新按鈕 active 狀態
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter') || 'all';

                // Step 1：所有卡片先縮小淡出
                productCards.forEach(card => {
                    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    card.style.opacity    = '0';
                    card.style.transform  = 'scale(0.95)';
                });

                // Step 2：等待縮小動畫結束後，切換顯示並淡入
                setTimeout(() => {
                    productCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        const isVisible = (filterValue === 'all' || category === filterValue);

                        card.style.display = isVisible ? 'flex' : 'none';

                        if (isVisible) {
                            // 稍微延遲讓 display:flex 生效後再執行動畫
                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    card.style.opacity   = '1';
                                    card.style.transform = 'scale(1)';
                                });
                            });
                        }
                    });
                }, 260); // 配合縮小動畫時間

            });
        });
    }


    /* ==========================================================
       04. 檢驗報告 Lightbox 放大預覽
       - 點擊 .report-preview-card 內的圖片 → 展開 Modal
       - 點擊關閉按鈕或背景 → 關閉 Modal
       ========================================================== */
    const modal     = document.getElementById('pawiLightbox');
    const modalImg  = document.getElementById('imgFullView');
    const modalCapt = document.getElementById('modalCaption');
    const closeBtn  = document.querySelector('.modal-close');
    const reportImgs = document.querySelectorAll('.report-preview-card img');

    if (modal && reportImgs.length > 0) {

        reportImgs.forEach(img => {
            img.addEventListener('click', function () {
                modalImg.src        = this.src;
                modalCapt.innerHTML = this.alt;
                modal.style.display = 'flex';
            });
        });

        // 關閉按鈕
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // 點擊 Modal 背景關閉
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // 按 Esc 鍵關閉
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

}); // END DOMContentLoaded


/* ============================================================
   03. 產品詳情頁籤切換（openTab）
   - 定義在全域，供 HTML 中的 onclick="openTab(event, 'tabId')" 呼叫
   - @param {Event}  evt     - 點擊事件物件
   - @param {string} tabName - 要顯示的頁籤內容區塊 ID
   ============================================================ */
function openTab(evt, tabName) {

    // 隱藏所有頁籤內容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // 移除所有頁籤按鈕的 active 狀態
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 顯示目標頁籤，並加上 active（延遲觸發 CSS 過渡動畫）
    const target = document.getElementById(tabName);
    if (target) {
        target.style.display = 'block';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                target.classList.add('active');
            });
        });
    }

    // 為當前按鈕加上 active
    evt.currentTarget.classList.add('active');
}
