const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const rolePills = document.querySelectorAll('.role-pill');
const scrollIndicator = document.getElementById('scrollIndicator');
const heroSection = document.getElementById('home');

function setMobileMenuState(open) {
    navMenu.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    const bars = hamburger.querySelectorAll('span');
    if (bars.length === 3) {
        bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : 'none';
        bars[1].style.opacity = open ? '0' : '1';
        bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : 'none';
    }
}

hamburger?.addEventListener('click', () => {
    setMobileMenuState(!navMenu.classList.contains('is-open'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => setMobileMenuState(false));
});

document.addEventListener('click', (event) => {
    if (!navMenu.classList.contains('is-open')) {
        return;
    }

    if (navMenu.contains(event.target) || hamburger.contains(event.target)) {
        return;
    }

    setMobileMenuState(false);
});

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function updateNavbarState() {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
}

function updateActiveLink() {
    const offset = window.scrollY + 160;
    let activeSectionId = 'home';

    sections.forEach((section) => {
        if (offset >= section.offsetTop) {
            activeSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeSectionId}`);
    });
}

let scrollIndicatorRemoved = false;

function updateScrollIndicator() {
    if (!scrollIndicator || !heroSection || scrollIndicatorRemoved) {
        return;
    }

    const threshold = heroSection.offsetHeight * 0.6;
    if (window.scrollY > threshold) {
        scrollIndicator.classList.add('is-hidden');
        scrollIndicatorRemoved = true;
        window.setTimeout(() => {
            scrollIndicator.remove();
        }, 320);
    }
}

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.16, rootMargin: '0px 0px -80px 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

let activeRoleIndex = 0;
function rotateRoles() {
    if (!rolePills.length) {
        return;
    }

    rolePills.forEach((pill, index) => {
        pill.classList.toggle('active', index === activeRoleIndex);
    });

    activeRoleIndex = (activeRoleIndex + 1) % rolePills.length;
}

const roleTimer = rolePills.length > 1 ? window.setInterval(rotateRoles, 2200) : null;
if (roleTimer !== null) {
    rotateRoles();
}

window.addEventListener('scroll', () => {
    updateNavbarState();
    updateActiveLink();
    updateScrollIndicator();
}, { passive: true });

window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
        setMobileMenuState(false);
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    updateNavbarState();
    updateActiveLink();
    updateScrollIndicator();
    if (rolePills.length > 0) {
        rolePills.forEach((pill, index) => {
            pill.classList.toggle('active', index === 0);
        });
    }
});

console.log('%cMuhammad Ahsan portfolio loaded', 'color:#1f2394;font-size:16px;font-weight:700;');
