// 웹코딩용 임시 헤더파일 불러오기
// ! ----- 웹코딩 완료 후 코드 삭제
function loadHTML(elementId, url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // innerHTML로 삽입된 <script>는 브라우저가 실행하지 않으므로
            // script 태그를 찾아 동적으로 재실행
            const el = document.getElementById(elementId);
            el.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                document.body.appendChild(newScript);
            });

            if (callback) callback();
        })
        .catch(error => console.error('Error:', error));
}

function initMegaMenu() {
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
}

function initMobileMenu() {
    var btn      = document.getElementById('hamburgerBtn');
    var drawer   = document.getElementById('mobileDrawer');
    var overlay  = document.getElementById('mobileOverlay');
    var closeBtn = document.getElementById('drawerClose');

    if (!btn || !drawer) return;

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('open');
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('open');
    }

    btn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // 아코디언 서브메뉴
    document.querySelectorAll('.mobile_nav_toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            var item   = this.closest('.mobile_nav_item');
            var isOpen = item.classList.contains('open');
            document.querySelectorAll('.mobile_nav_item.open').forEach(function(el) { el.classList.remove('open'); });
            if (!isOpen) item.classList.add('open');
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
  loadHTML('hd', 'header.html', function () {
    initMegaMenu();
    initMobileMenu();
  });

  loadHTML('ft', 'footer.html');
});
// 웹코딩 완료 후 코드 삭제 ----- !

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
