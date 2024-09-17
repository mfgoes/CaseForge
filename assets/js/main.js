document.addEventListener('DOMContentLoaded', function() {
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

            // Initialize side panel handling
            initializeSidePanel(); // Define this function to set up side panel interactions
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
