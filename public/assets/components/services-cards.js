document.addEventListener('DOMContentLoaded', function() {
    const servicesContainer = document.getElementById('services-container');

    fetch('assets/html/services-cards.html')
        .then(response => response.text())
        .then(data => {
            servicesContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading services:', error));
});
