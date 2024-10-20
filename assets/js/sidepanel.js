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
    sidePanel.classList.add('show'); // Use the 'show' class to open the panel
}

function closeSidePanel() {
    // Hide the side panel by removing the 'show' class
    sidePanel.classList.remove('show');
}

function initializeSidePanel() {
    // Ensure the close button works
    closeBtn.addEventListener('click', closeSidePanel);

    // Ensure rows have the necessary data attributes for the side panel
    document.querySelectorAll('#watches-table tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            console.log("Row clicked:", row); // Debug: Check if the row is being clicked

            const data = {
                name: row.dataset.name,
                description: row.dataset.description,
                category: row.dataset.category,
                price: row.dataset.price,
                image: row.dataset.image,
                specs: row.dataset.specs.split(';')
            };

            console.log("Data to be passed to side panel:", data); // Debug: Check the data being passed
            openSidePanel(data); // Open side panel with row data
        });
    });
}

// Initialize the side panel
initializeSidePanel();
