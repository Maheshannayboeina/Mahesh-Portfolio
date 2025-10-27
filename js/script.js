// This function sets up all the interactive elements.
// We'll call it either on DOMContentLoaded or after the navbar is loaded.
function initializeInteractiveElements() {

    // in js/script.js, inside the initializeInteractiveElements function

    // --- SWIPER JS FOR VIDEO SLIDER ---
    if (document.querySelector('.swiper')) {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            effect: 'coverflow', // Adds a cool 3D effect
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true, // Loops back to the beginning
            
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },

            // Autoplay configuration
            autoplay: {
                delay: 5000, // 5 seconds between slides
                disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            },

            // Pagination (the dots)
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // --- TYPED.JS FOR HERO SUBTITLE ---
    if (document.querySelector('.subtitle-typed')) {
        const typed = new Typed('.subtitle-typed', {
            strings: [
                " Cybersecurity Student.",
                " CTF Competitor.",
                " Reverse Engineer.",
                " Penetration Tester."
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000,
        });
    }

    // --- SCROLL-IN ANIMATIONS FOR CONTENT SECTIONS ---
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

    // --- BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top-button');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
}

// This function sets up logic that specifically depends on the navbar
function initializeNavbarLogic() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('main section[id]');

    // --- NAVBAR SCROLL EFFECT (BACKGROUND) ---
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- ACTIVE NAV LINK ON SCROLL (THE FIX) ---
    if (navLinks.length > 0 && contentSections.length > 0) {
        const activateNavLink = (id) => {
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Check if the link's href ends with the section's id
                if (link.getAttribute('href').endsWith(`#${id}`)) {
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
        }, {
            rootMargin: '-40% 0px -60% 0px'
        });

        contentSections.forEach(section => {
            navObserver.observe(section);
        });
    }
}

// --- INITIALIZATION LOGIC ---

// Run the general interactive elements setup right away
document.addEventListener('DOMContentLoaded', initializeInteractiveElements);

// Wait for the special 'navbarLoaded' event to run navbar-specific logic
document.addEventListener('navbarLoaded', initializeNavbarLogic);