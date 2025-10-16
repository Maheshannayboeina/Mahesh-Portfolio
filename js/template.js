document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
            });
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
        document.body.append(footerPlaceholder);
    }
    
    // Load components
    loadComponent('#navbar-placeholder', '/nav.html');
    loadComponent('#footer-placeholder', '/footer.html');
});