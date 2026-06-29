$(document).ready(function() {
	
});

// 헤더 메뉴 오픈 이벤트
$(function () {
    const $header = $('.header');
    const $navItem = $('.main_nav .nav_item');

    $navItem.on('mouseenter', function () {
        $header.addClass('is-mega-open');

        $navItem.removeClass('active');
        $(this).addClass('active');
    });

    $header.on('mouseleave', function () {
        $header.removeClass('is-mega-open');
        $navItem.removeClass('active');
    });
});

// =============================================
// 관리자 사이드 메뉴 로드 & 현재 페이지 active
// =============================================
function loadAdminMenu(callback) {
    const menuEl = document.getElementById('menu');
    if (!menuEl) return;

    // 현재 파일명 추출 (예: adminUserSet.html → adminUserSet)
    const currentPage = location.pathname.split('/').pop().replace('.html', '');

    fetch('adminMenu.html')
        .then(res => {
            if (!res.ok) throw new Error('메뉴 파일 로드 실패');
            return res.text();
        })
        .then(html => {
            menuEl.outerHTML = html;

            // active 처리: data-menu 속성이 현재 파일명과 일치하는 링크에 active 부여
            document.querySelectorAll('.side_group a[data-menu]').forEach(function(a) {
                if (a.dataset.menu === currentPage) {
                    a.classList.add('active');
                }
            });

            if (callback) callback();
        })
        .catch(err => console.error('Admin menu load error:', err));
}
