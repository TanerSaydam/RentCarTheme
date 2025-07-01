// Sidebar ve Menü JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.querySelector('.mobile-sidebar-toggle');
    const mainWrapper = document.querySelector('.main-wrapper');

    // Sidebar toggle fonksiyonu
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');

        // Main wrapper margin ayarı
        if (sidebar.classList.contains('collapsed')) {
            mainWrapper.style.marginLeft = '70px';
        } else {
            mainWrapper.style.marginLeft = '280px';
        }

        // Local storage'a kaydet
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }

    // Mobile sidebar toggle
    function toggleMobileSidebar() {
        sidebar.classList.toggle('show');

        // Backdrop ekle/kaldır
        let backdrop = document.querySelector('.sidebar-backdrop');
        if (sidebar.classList.contains('show')) {
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'sidebar-backdrop';
                document.body.appendChild(backdrop);

                // Backdrop'e tıklandığında sidebar'ı kapat
                backdrop.addEventListener('click', function () {
                    sidebar.classList.remove('show');
                    backdrop.remove();
                });
            }
        } else {
            if (backdrop) {
                backdrop.remove();
            }
        }
    }

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', toggleMobileSidebar);
    }

    // Submenu Toggle
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const menuLink = item.querySelector('.menu-link');
        const submenu = item.querySelector('.submenu');
        const menuArrow = item.querySelector('.menu-arrow');

        if (submenu) {
            menuLink.addEventListener('click', function (e) {
                e.preventDefault();

                // Diğer açık menüleri kapat (accordion effect)
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                        const otherSubmenu = otherItem.querySelector('.submenu');
                        if (otherSubmenu) {
                            otherSubmenu.style.maxHeight = '0';
                        }
                    }
                });

                // Toggle current menu
                item.classList.toggle('open');

                // Smooth height animation
                if (item.classList.contains('open')) {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                } else {
                    submenu.style.maxHeight = '0';
                }
            });
        }
    });

    // Active menu item highlight
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu-link, .submenu a');

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            // Highlight active link
            const menuItem = link.closest('.menu-item');
            if (menuItem) {
                menuItem.classList.add('active');

                // Open parent menu if in submenu
                const parentItem = link.closest('.submenu')?.closest('.menu-item');
                if (parentItem) {
                    parentItem.classList.add('open');
                    const parentSubmenu = parentItem.querySelector('.submenu');
                    if (parentSubmenu) {
                        parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + 'px';
                    }
                }
            }
        }
    });

    // Sidebar state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true' && window.innerWidth > 992) {
        sidebar.classList.add('collapsed');
        mainWrapper.style.marginLeft = '70px';
    }

    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('collapsed');
                mainWrapper.style.marginLeft = '0';
            } else {
                const savedState = localStorage.getItem('sidebarCollapsed');
                if (savedState === 'true') {
                    sidebar.classList.add('collapsed');
                    mainWrapper.style.marginLeft = '70px';
                } else {
                    sidebar.classList.remove('collapsed');
                    mainWrapper.style.marginLeft = '280px';
                }
            }
        }, 250);
    });
});

// Export functions for use in other scripts
window.sidebarUtils = {
    toggleSidebar: function () {
        document.getElementById('sidebarToggle')?.click();
    },
    showNotification: showNotification
};