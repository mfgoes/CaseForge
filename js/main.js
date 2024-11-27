document.addEventListener('DOMContentLoaded', function () {
    const csvFilePath = 'assets/database.csv'; // Path to your CSV file
    const tableBody = document.querySelector('#watches-table tbody');
    const errorMessage = document.createElement('tr'); // Create a new row for the error message

    // Fetch the CSV file
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Split CSV data and skip the header

            // Check if there are rows to populate
            if (rows.length === 0) {
                throw new Error('CSV file is empty or no data found');
            }

            // Pass the rows to table.js for populating the table
            populateTable(rows); // populateTable is in table.js

            // Populate the default card view
            populateCardView(rows);

            // Initialize side panel only after rows are populated
            setTimeout(() => initializeSidePanel(), 0);
        })
        .catch(error => {
            // Handle errors and display an error message inside the table
            console.error('Error loading CSV file:', error);

            // Display the error message in the table
            errorMessage.innerHTML = `
                <td colspan="5" style="color: red; text-align: center;">
                    Error: ${error.message}. Please ensure the CSV file is available and try again.
                </td>`;
            tableBody.appendChild(errorMessage); // Append the error message as a table row
        });
});

// Function to populate the card view on page load
function populateCardView(rows) {
    const table = document.getElementById('watches-table');
    const cardsView = document.getElementById('cards-view');
    const toggleViewBtn = document.getElementById('toggle-view-btn');

    // Clear the card view first
    cardsView.innerHTML = '';

    // Populate cards from CSV data
    const cardPromises = rows.map(row => {
        const cols = row.split(',');

        const data = {
            name: cols[0].trim(),
            description: cols[1].trim(),
            category: cols[2].trim(),
            price: cols[3].trim(),
            image: cols[4].trim(),
            Project_link: cols[6] ? cols[6].trim() : ''
        };

        return createCard(data); // createCard is in ViewManager.js
    });

    // Append the cards to the card view
    Promise.all(cardPromises).then(cards => {
        cards.forEach(card => cardsView.appendChild(card));

        // Update visibility for default card view
        table.classList.add('d-none'); // Hide table
        cardsView.classList.remove('d-none'); // Show card view
        toggleViewBtn.textContent = "Toggle Table View"; // Update button text
    });
}
