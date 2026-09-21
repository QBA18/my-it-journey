const musicStorageKey = 'qistinaMusicState';
let music = document.getElementById('backgroundMusic');
let musicBtn = document.getElementById('musicBtn');
const floatingNav = document.querySelector('.floating-nav');
const backToTopBtn = document.getElementById('backToTop');

if (!music) {
    music = document.createElement('audio');
    music.id = 'backgroundMusic';
    music.autoplay = true;
    music.loop = true;
    music.preload = 'auto';
    music.muted = false;
    music.volume = 0.55;

    const source = document.createElement('source');
    source.src = 'audio/background.mp3';
    source.type = 'audio/mpeg';
    music.appendChild(source);
    document.body.appendChild(music);
}

if (!musicBtn) {
    musicBtn = document.createElement('button');
    musicBtn.id = 'musicBtn';
    musicBtn.type = 'button';
    musicBtn.setAttribute('aria-label', 'Toggle background music');
    document.body.appendChild(musicBtn);
}

const savedMusicState = JSON.parse(localStorage.getItem(musicStorageKey) || '{}');
const updateMusicButton = () => {
    musicBtn.textContent = music.paused ? '🔇 Music OFF' : '🔊 Music ON';
};

if (Number.isFinite(savedMusicState.currentTime)) {
    music.currentTime = savedMusicState.currentTime;
}

music.addEventListener('timeupdate', () => {
    localStorage.setItem(musicStorageKey, JSON.stringify({
        currentTime: music.currentTime,
        playing: !music.paused
    }));
});

window.addEventListener('pagehide', () => {
    localStorage.setItem(musicStorageKey, JSON.stringify({
        currentTime: music.currentTime,
        playing: !music.paused
    }));
});

music.addEventListener('pause', updateMusicButton);
music.addEventListener('play', updateMusicButton);

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(() => updateMusicButton());
    } else {
        music.pause();
    }
    updateMusicButton();
});

music.muted = false;
music.autoplay = true;
music.volume = 0.55;
updateMusicButton();
music.play().catch(() => updateMusicButton());

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
