document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR SCROLL EFFECT ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- TYPED.JS FOR HERO SUBTITLE ---
    const typed = new Typed('.subtitle-typed', {
        strings: [
            "Cybersecurity Student.",
            "CTF Competitor.",
            "Reverse Engineer.",
            "Penetration Tester."
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000,
    });

    // --- SCROLL-IN ANIMATIONS ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- ACTIVE NAV LINK ON SCROLL ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section, .hero-section');

    const activateNavLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateNavLink(entry.target.id);
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    contentSections.forEach(section => {
        navObserver.observe(section);
    });
    
    // --- BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top-button');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});