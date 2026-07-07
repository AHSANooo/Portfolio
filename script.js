const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const rolePills = document.querySelectorAll('.role-pill');
const scrollIndicator = document.getElementById('scrollIndicator');
const heroSection = document.getElementById('home');
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalText = document.getElementById('projectModalText');
const projectModalDiagram = document.getElementById('projectModalDiagram');
const projectButtons = document.querySelectorAll('.project-showcase');

const projectShowcases = {
    fastable: {
        title: 'FASTable',
        text: 'A modular timetable system built to automate scheduling through Google Sheets API pipelines and a clean multi-file architecture for future scale.',
        diagram: `
            <svg viewBox="0 0 760 240" width="100%" height="100%" role="img" aria-label="FASTable architecture diagram">
                <rect x="18" y="28" width="150" height="72" rx="16" fill="rgba(31,35,148,0.24)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="205" y="28" width="150" height="72" rx="16" fill="rgba(15,52,96,0.3)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="392" y="28" width="150" height="72" rx="16" fill="rgba(31,35,148,0.24)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="579" y="28" width="150" height="72" rx="16" fill="rgba(15,52,96,0.3)" stroke="rgba(154,179,255,0.4)"/>
                <path d="M168 64H205M355 64H392M542 64H579" stroke="rgba(47,84,255,0.8)" stroke-width="3" stroke-linecap="round"/>
                <text x="93" y="71" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Sheets API</text>
                <text x="280" y="71" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Parser</text>
                <text x="467" y="71" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Scheduler</text>
                <text x="654" y="71" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Android UI</text>
                <rect x="160" y="145" width="440" height="62" rx="18" fill="rgba(8,17,32,0.78)" stroke="rgba(31,35,148,0.45)"/>
                <text x="380" y="182" text-anchor="middle" fill="#f4f8ff" font-size="16" font-weight="700">Modular data flow from cloud sheet to user device</text>
            </svg>
        `
    },
    prepspace: {
        title: 'PrepSpace',
        text: 'An AI-powered assessment studio that ingests raw text at scale, generates structured comprehension material, and keeps the output pipeline clear and adaptable.',
        diagram: `
            <svg viewBox="0 0 760 240" width="100%" height="100%" role="img" aria-label="PrepSpace architecture diagram">
                <rect x="30" y="42" width="140" height="62" rx="16" fill="rgba(31,35,148,0.22)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="210" y="42" width="140" height="62" rx="16" fill="rgba(15,52,96,0.3)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="390" y="42" width="140" height="62" rx="16" fill="rgba(31,35,148,0.22)" stroke="rgba(154,179,255,0.4)"/>
                <rect x="570" y="42" width="140" height="62" rx="16" fill="rgba(15,52,96,0.3)" stroke="rgba(154,179,255,0.4)"/>
                <path d="M170 73H210M350 73H390M530 73H570" stroke="rgba(47,84,255,0.8)" stroke-width="3" stroke-linecap="round"/>
                <text x="100" y="82" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Raw Text</text>
                <text x="280" y="82" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">LLM Layer</text>
                <text x="460" y="82" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Quiz Logic</text>
                <text x="640" y="82" text-anchor="middle" fill="#f4f8ff" font-size="15" font-weight="700">Assessment UI</text>
                <rect x="108" y="145" width="544" height="56" rx="18" fill="rgba(8,17,32,0.78)" stroke="rgba(31,35,148,0.45)"/>
                <text x="380" y="180" text-anchor="middle" fill="#f4f8ff" font-size="16" font-weight="700">Structured reading comprehension generation pipeline</text>
            </svg>
        `
    }
};

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

function openProjectModal(projectKey) {
    const project = projectShowcases[projectKey];
    if (!project || !projectModal || !projectModalTitle || !projectModalText || !projectModalDiagram) {
        return;
    }

    projectModalTitle.textContent = project.title;
    projectModalText.textContent = project.text;
    projectModalDiagram.innerHTML = project.diagram;
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) {
        return;
    }

    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

projectButtons.forEach((button) => {
    button.addEventListener('click', () => openProjectModal(button.dataset.project));
});

projectModalClose?.addEventListener('click', closeProjectModal);
projectModal?.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

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
