document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll('.reveal');

    // Mobile Drawer Navigation
    function setMobileMenuState(open) {
        if (!navMenu || !hamburger) return;
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
        const isOpen = navMenu?.classList.contains('is-open');
        setMobileMenuState(!isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => setMobileMenuState(false));
    });

    document.addEventListener('click', (event) => {
        if (!navMenu?.classList.contains('is-open')) return;
        if (navMenu.contains(event.target) || hamburger?.contains(event.target)) return;
        setMobileMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu?.classList.contains('is-open')) {
            setMobileMenuState(false);
            hamburger?.focus();
        }
    });

    // Smooth Anchor Navigation
    navLinks.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Navbar Scroll & Active Link Tracking
    function updateNavbarState() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    function updateActiveLink() {
        const offset = window.scrollY + 140;
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

    // Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach((element) => {
        // Immediate reveal check for elements in viewport on load
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('visible');
        } else {
            revealObserver.observe(element);
        }
    });

    window.addEventListener('scroll', () => {
        updateNavbarState();
        updateActiveLink();
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) {
            setMobileMenuState(false);
        }
    });

    // Initial state trigger
    updateNavbarState();
    updateActiveLink();
});
