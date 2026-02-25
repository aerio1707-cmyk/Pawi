/**
 * Pawi (派怡) 官方網站核心互動邏輯
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;
    const icon = menuToggle ? menuToggle.querySelector('i') : null;

    // 開關選單函式
    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        if (icon) {
            if (isActive) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    }

    if (menuToggle && navMenu && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // 點擊遮罩關閉
        menuOverlay.addEventListener('click', toggleMenu);

        // 點擊導覽連結後自動關閉（適合單頁捲動錨點）
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- 產品分類過濾功能 ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter') || 'all';

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
});

// 全域頁籤切換 (產品詳情頁使用)
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