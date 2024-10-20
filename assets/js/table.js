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

            // Create and append table cells (excluding specs column)
            cols.slice(0, 5).forEach((col, index) => { // Only process the first 5 columns (exclude specs)
                const td = document.createElement('td');
                if (index === 4) { // Image column
                    const img = document.createElement('img');
                    img.src = col.trim();
                    img.alt = cols[0].trim(); // Watch name as alt text
                    //img.style.maxWidth = '100px';
                    //img.style.height = 'auto';
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

function createCard(data) {
    return `
    <div class="col-md-6">
        <div class="card">
            <div class="card-img-top">
                <img src="${data.image}" alt="Watch Image" class="img-fluid">
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <p class="card-category">Category: ${data.category}</p>
                <p class="card-price">Price: €${data.price}</p>
            </div>
        </div>
    </div>`;
}


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

        rows.forEach(row => {
            const data = {
                name: row.cells[0].textContent,
                description: row.cells[1].textContent,
                category: row.cells[2].textContent,
                price: row.cells[3].textContent,
                image: row.cells[4].querySelector('img').src
            };
            cardsView.innerHTML += createCard(data); // Add each card to the card view
        });

        // Hide table and show cards
        table.classList.add('d-none');
        cardsView.classList.remove('d-none');
        toggleViewBtn.textContent = "Toggle Table View";
    }
}

toggleViewBtn.addEventListener('click', toggleView);

