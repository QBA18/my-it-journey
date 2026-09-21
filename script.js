const floatingNav = document.querySelector('.floating-nav');
const backToTopBtn = document.getElementById('backToTop');

if (floatingNav) {
    const desktopQuery = window.matchMedia('(min-width: 981px)');

    const updateNavVisibility = (event) => {
        if (!desktopQuery.matches) {
            floatingNav.classList.remove('edge-hidden');
            return;
        }

        const cursorNearEdge = event.clientX <= 36;
        const navRect = floatingNav.getBoundingClientRect();
        const cursorOverNav = event.clientX >= navRect.left
            && event.clientX <= navRect.right
            && event.clientY >= navRect.top
            && event.clientY <= navRect.bottom;

        floatingNav.classList.toggle('edge-hidden', !cursorNearEdge && !cursorOverNav);
    };

    if (desktopQuery.matches) {
        floatingNav.classList.add('edge-hidden');
    }

    window.addEventListener('pointermove', updateNavVisibility, { passive: true });
    desktopQuery.addEventListener('change', () => {
        floatingNav.classList.toggle('edge-hidden', desktopQuery.matches);
    });
}

if (backToTopBtn) {
    const toggleBackToTop = () => {
        if (window.scrollY > 220) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
