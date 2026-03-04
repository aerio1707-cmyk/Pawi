/**
 * ============================================================
 *  Pawi (派怡) 官方網站 — 核心互動邏輯
 *  版本：V2.0  (2026-03)
 *
 *  *** 此檔案需放置於 Pawi/js/main.js ***
 *
 *  功能模組：
 *    01. 漢堡選單（手機版側滑 + 遮罩）
 *    02. 產品分類過濾（含淡入動畫）
 *    03. 產品詳情頁籤切換（openTab）
 *    04. 檢驗報告 Lightbox 放大預覽
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    /* =========================================================
       01. 漢堡選單
       ========================================================= */
    var menuToggle  = document.getElementById('menuToggle');
    var navMenu     = document.getElementById('navMenu');
    var menuOverlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        if (!navMenu || !menuOverlay) return;

        var isActive = navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open', isActive);

        // 漢堡圖示切換 fa-bars ↔ fa-times
        var icon = menuToggle ? menuToggle.querySelector('i') : null;
        if (icon) {
            icon.classList.toggle('fa-bars',  !isActive);
            icon.classList.toggle('fa-times',  isActive);
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* =========================================================
       02. 產品分類過濾
       ========================================================= */
    var filterButtons = document.querySelectorAll('.filter-btn');
    var productCards  = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filterValue = btn.getAttribute('data-filter') || 'all';

                productCards.forEach(function (card) {
                    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    card.style.opacity    = '0';
                    card.style.transform  = 'scale(0.95)';
                });

                setTimeout(function () {
                    productCards.forEach(function (card) {
                        var category  = card.getAttribute('data-category');
                        var isVisible = (filterValue === 'all' || category === filterValue);
                        card.style.display = isVisible ? 'flex' : 'none';
                        if (isVisible) {
                            requestAnimationFrame(function () {
                                requestAnimationFrame(function () {
                                    card.style.opacity   = '1';
                                    card.style.transform = 'scale(1)';
                                });
                            });
                        }
                    });
                }, 260);
            });
        });
    }


    /* =========================================================
       04. 檢驗報告 Lightbox
       ========================================================= */
    var modal      = document.getElementById('pawiLightbox');
    var modalImg   = document.getElementById('imgFullView');
    var modalCapt  = document.getElementById('modalCaption');
    var closeBtn   = document.querySelector('.modal-close');
    var reportImgs = document.querySelectorAll('.report-preview-card img');

    if (modal && reportImgs.length > 0) {
        reportImgs.forEach(function (img) {
            img.addEventListener('click', function () {
                modalImg.src        = this.src;
                modalCapt.innerHTML = this.alt;
                modal.style.display = 'flex';
            });
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
            });
        }
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.style.display = 'none';
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

}); // END DOMContentLoaded


/* ============================================================
   03. 產品詳情頁籤切換（全域，供 HTML onclick 呼叫）
   ============================================================ */
function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(function (c) {
        c.style.display = 'none';
        c.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    var target = document.getElementById(tabName);
    if (target) {
        target.style.display = 'block';
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                target.classList.add('active');
            });
        });
    }
    evt.currentTarget.classList.add('active');
}
