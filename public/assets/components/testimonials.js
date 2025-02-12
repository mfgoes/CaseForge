document.addEventListener('DOMContentLoaded', function() {
    const testimonialsContainer = document.getElementById('testimonials-container');

    fetch('assets/html/testimonials.html')
        .then(response => response.text())
        .then(data => {
            testimonialsContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading testimonials:', error));
});
