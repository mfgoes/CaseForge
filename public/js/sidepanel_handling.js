// Side Panel Handling
function openSidePanel(data) {
    const watchName = document.getElementById('sidePanelWatchName');
    const watchDescription = document.getElementById('sidePanelWatchDescription');
    const watchCategory = document.getElementById('sidePanelWatchCategory');
    const watchPrice = document.getElementById('sidePanelWatchPrice');
    const watchImage = document.getElementById('sidePanelWatchImage');
    const watchSpecsTitle = document.getElementById('sidePanelWatchSpecsTitle');
    const watchLink = document.getElementById('Project_link'); // Gets the element in the brackets
    const itemAffiliateLink = document.getElementById('Ref_link'); // Gets the element in the brackets

    // Log the data received
    console.log("Data received in openSidePanel:", data);

    if (watchName && watchDescription && watchCategory && watchPrice && watchImage) {
        watchName.textContent = data.name;
        watchDescription.textContent = data.description;
        watchCategory.textContent = data.category;
        watchPrice.textContent = data.price;
        watchImage.src = data.image;
        watchImage.alt = data.name;
        watchSpecsTitle.textContent = `${data.name} Specifications`;
        
        // Set link text and href
        watchLink.textContent = data.Project_link ? 'View Details' : 'No Detail page available';
        watchLink.href = data.Project_link || '#'; // Set href attribute
        
        itemAffiliateLink.textContent = data.Ref_link ? 'Affiliate Link' : 'No Ref link available';
        itemAffiliateLink.href = data.Ref_link || '#'; // Set href attribute

        // Log watch link status
        if (!data.Project_link) {
            console.warn("Warning: Project_link is missing or empty.");
        }

        // Update specifications
        const specsList = document.getElementById('sidePanelWatchSpecs');
        specsList.innerHTML = ''; // Clear previous specs
        data.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });

        // Show the side panel
        const sidePanel = document.getElementById('sidePanel');
        sidePanel.classList.add('show');
    } else {
        console.error("One or more side panel elements not found.");
    }
}


function closeSidePanel() {
    const sidePanel = document.getElementById('sidePanel');
    sidePanel.classList.remove('show');
}

function initializeSidePanel() {
    const sidePanel = document.getElementById('sidePanel');
    const closeBtn = sidePanel.querySelector('.close-btn');

    // Ensure the close button works
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
                specs: row.dataset.specs.split(';'),
                Project_link: row.dataset.Project_link,
                Ref_link: row.dataset.Ref_link
            };

            // Log the data being retrieved
            console.log("Data prepared for openSidePanel:", data);

            openSidePanel(data);
        });
    });
}
