document.addEventListener("DOMContentLoaded", function() {
    // A flag to ensure the main script's setup runs only once
    let isNavLogicInitialized = false;

    // Function to fetch and insert HTML content
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${url}`);
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                    // If we just loaded the navbar, dispatch our custom event
                    if (selector === '#navbar-placeholder' && !isNavLogicInitialized) {
                        document.dispatchEvent(new CustomEvent('navbarLoaded'));
                        isNavLogicInitialized = true;
                    }
                }
            })
            .catch(error => console.error(error));
    };

    // Create placeholder divs if they don't exist
    if (!document.querySelector('#navbar-placeholder')) {
        const navPlaceholder = document.createElement('header');
        navPlaceholder.id = 'navbar-placeholder';
        document.body.prepend(navPlaceholder);
    }
    if (!document.querySelector('#footer-placeholder')) {
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';
        // Use insertAdjacentElement to place footer right before the script tags
        const lastScript = document.querySelector('script[src*="template.js"]');
        if (lastScript) {
             document.body.insertBefore(footerPlaceholder, lastScript);
        } else {
            document.body.append(footerPlaceholder);
        }
    }

    // Load components
    loadComponent('#navbar-placeholder', '/nav.html');
    loadComponent('#footer-placeholder', '/footer.html');
});