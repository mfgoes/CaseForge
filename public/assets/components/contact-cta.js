document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('contact-cta-container');

    fetch('assets/html/contact-cta.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading CTA:', error));
});
