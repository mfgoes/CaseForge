// Side Panel Handling
const sidePanel = document.getElementById('sidePanel');
const closeBtn = document.querySelector('.side-panel .close-btn');

function openSidePanel(data) {
    // Populate side panel with data
    document.getElementById('sidePanelWatchName').textContent = data.name;
    document.getElementById('sidePanelWatchDescription').textContent = data.description;
    document.getElementById('sidePanelWatchCategory').textContent = data.category;
    document.getElementById('sidePanelWatchPrice').textContent = data.price;
    document.getElementById('sidePanelWatchImage').src = data.image;
    document.getElementById('sidePanelWatchImage').alt = data.name;
    
    document.getElementById('sidePanelWatchSpecsTitle').textContent = `${data.name} Specifications`;
    
    const specsList = document.getElementById('sidePanelWatchSpecs');
    specsList.innerHTML = ''; // Clear previous specs
    data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });

    // Open side panel
    sidePanel.classList.add('open');
}

function closeSidePanel() {
    sidePanel.classList.remove('open');
}

function initializeSidePanel() {
    closeBtn.addEventListener('click', closeSidePanel);

    // Ensure rows have the necessary data attributes for the side panel
    document.querySelectorAll('#watches-table tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            const data = {
                name: row.dataset.name,
                description: row.dataset.description,
                category: row.dataset.category,
                price: row.dataset.price,
                image: row.dataset.image,
                specs: row.dataset.specs.split(';')
            };
            openSidePanel(data);
        });
    });
}

// Export the function if needed for modularization
// export { initializeSidePanel };
