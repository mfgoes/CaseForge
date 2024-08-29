document.addEventListener('DOMContentLoaded', function() {
    const csvFilePath = 'assets/database.csv'; // Path to your CSV file

    // Initialize the table and modal handling
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Split CSV data and skip the header

            // Initialize table with data
            populateTable(rows);

            // Initialize modal handling
            handleRowClick();
        })
        .catch(error => console.error('Error loading CSV file:', error));
});
