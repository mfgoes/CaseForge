document.addEventListener('DOMContentLoaded', function () {
    const sidePanelContainer = document.getElementById('side-panel-container');

    fetch('assets/html/sidepanel.html')
        .then(response => response.text())
        .then(data => {
            sidePanelContainer.innerHTML = data;

            // Ensure initializeSidePanel is only called after the HTML is loaded
            if (typeof initializeSidePanel === 'function') {
                initializeSidePanel();
            }
        })
        .catch(error => console.error('Error loading side panel:', error));
});
