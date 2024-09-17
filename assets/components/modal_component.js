document.addEventListener('DOMContentLoaded', function() {
    const modalHtmlPath = 'assets/html/modal.html'; // Path to your modal HTML file
    const modalContainer = document.querySelector('#modal-container'); // Ensure you have a container in your main HTML for the modal

    fetch(modalHtmlPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            modalContainer.innerHTML = data;
            // Initialize modal functionality if needed, for example:
            const modalElement = document.getElementById('watchModal');
            const modal = new bootstrap.Modal(modalElement); // Ensure you are using the correct Bootstrap version
        })
        .catch(error => {
            console.error('Error loading modal HTML file:', error);
            // Display error message if needed
        });
});


