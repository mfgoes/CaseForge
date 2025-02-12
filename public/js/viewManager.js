function populateTable(rows) {
    const tableBody = document.querySelector('#watches-table tbody');

    rows.forEach(row => {
        if (row.trim() !== '') {
            const cols = row.split(',');

            // Create a new table row
            const tr = document.createElement('tr');

            // Set data attributes for the modal (including specs)
            tr.dataset.name = cols[0].trim();
            tr.dataset.description = cols[1].trim();
            tr.dataset.category = cols[2].trim();
            tr.dataset.price = cols[3].trim();
            tr.dataset.image = cols[4].trim();
            tr.dataset.specs = cols[5] ? cols[5].trim() : ''; // Specifications (excluded from display)
            tr.dataset.Project_link = cols[6] ? cols[6].trim() : ''; // New Project_link attribute
            tr.dataset.Ref_link = cols[7] ? cols[7].trim() : ''; // New Ref_link attribute

            // Create and append table cells (excluding specs column)
            cols.slice(0, 5).forEach((col, index) => { // Only process the first 5 columns (exclude specs)
                const td = document.createElement('td');
                if (index === 4) { // Image column
                    const img = document.createElement('img');
                    img.src = col.trim();
                    img.alt = cols[0].trim(); // Watch name as alt text
                    td.appendChild(img);
                } else {
                    td.textContent = col.trim(); // Remove extra whitespace
                }
                tr.appendChild(td);
            });

            // Append the row to the table body
            tableBody.appendChild(tr);
        }
    });
}

const table = document.getElementById('watches-table');
const cardsView = document.getElementById('cards-view');
const toggleViewBtn = document.getElementById('toggle-view-btn');

function toggleView() {
    if (table.classList.contains('d-none')) {
        // Show table and hide cards
        table.classList.remove('d-none');
        cardsView.classList.add('d-none');
        toggleViewBtn.textContent = "Toggle Card View";
    } else {
        // Switch to card view
        const rows = document.querySelectorAll('#watches-table tbody tr');
        cardsView.innerHTML = ''; // Clear previous cards

        // Create an array of promises for each card
        const cardPromises = Array.from(rows).map(row => {
            const data = {
                name: row.cells[0].textContent,
                description: row.cells[1].textContent,
                category: row.cells[2].textContent,
                price: row.cells[3].textContent,
                image: row.cells[4].querySelector('img').src,
                Project_link: row.dataset.Project_link // Accessing from dataset
            };
            return createCard(data); // Each card is created asynchronously
        });

        // Wait for all cards to be created before appending
        Promise.all(cardPromises).then(cards => {
            cards.forEach(card => cardsView.appendChild(card));
        });

        // Hide table and show cards
        table.classList.add('d-none');
        cardsView.classList.remove('d-none');
        toggleViewBtn.textContent = "Toggle Table View";
    }
}


toggleViewBtn.addEventListener('click', toggleView);

let cardTemplate = '';

function createCard(data) {
    if (!cardTemplate) {
        // Fetch and cache the card template
        return fetch('assets/html/card_home.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load card template');
                }
                return response.text();
            })
            .then(template => {
                cardTemplate = template; // Cache the template
                return createCardFromTemplate(cardTemplate, data); // Use cached template to create card
            });
    } else {
        // Use cached template if already loaded
        return Promise.resolve(createCardFromTemplate(cardTemplate, data));
    }
}

function createCardFromTemplate(template, data) {
    // Create a container for the template HTML
    const cardContainer = document.createElement('div');
    cardContainer.innerHTML = template;

    // Populate template with data
    const imgElement = cardContainer.querySelector('[data-image-src]');
    const titleElement = cardContainer.querySelector('[data-card-title]');
    const descriptionElement = cardContainer.querySelector('[data-card-description]');
    const categoryElement = cardContainer.querySelector('[data-card-category]');
    const priceElement = cardContainer.querySelector('[data-card-price]');
    const projectLinkElement = cardContainer.querySelector('[data-project-link]');

    // Update the image element with the source
    if (imgElement) imgElement.setAttribute('src', data.image);
    if (titleElement) titleElement.textContent = data.name;
    if (descriptionElement) descriptionElement.textContent = data.description;
    if (categoryElement) categoryElement.textContent = `Category: ${data.category}`;
    if (priceElement) priceElement.textContent = `Price: €${data.price}`;
    if (projectLinkElement && data.Project_link) {
        projectLinkElement.href = data.Project_link;
        projectLinkElement.classList.remove('d-none'); // Make button visible if Project_link exists
    }

    return cardContainer.firstElementChild; // Return the populated card element
}
