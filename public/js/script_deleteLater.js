document.addEventListener('DOMContentLoaded', function() {
    // Define the path to the CSV file
    const csvFilePath = 'assets/database.csv'; // Adjust the path if necessary

    // Fetch the CSV file
    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Split CSV data into rows
            const rows = data.trim().split('\n').slice(1); // Skip header row

            // Get the table body element
            const tableBody = document.querySelector('#watches-table tbody');

            // Process each row
            rows.forEach(row => {
                if (row.trim() !== '') { // Skip empty rows
                    const cols = row.split(',');

                    // Create a new table row
                    const tr = document.createElement('tr');

                    // Set data attributes for the modal
                    tr.dataset.name = cols[0].trim();
                    tr.dataset.description = cols[1].trim();
                    tr.dataset.category = cols[2].trim();
                    tr.dataset.price = cols[3].trim();
                    tr.dataset.image = cols[4].trim();

                    // Create and append table cells
                    cols.forEach((col, index) => {
                        const td = document.createElement('td');
                        if (index === 4) { // Image column
                            const img = document.createElement('img');
                            img.src = col.trim(); // Remove any extra whitespace
                            img.alt = cols[0].trim(); // Use watch name as alt text
                            img.style.maxWidth = '100px';
                            img.style.height = 'auto';
                            td.appendChild(img);
                        } else {
                            td.textContent = col.trim(); // Remove extra whitespace
                        }
                        tr.appendChild(td);
                    });

                    // Add click event listener to the row to open modal
                    tr.addEventListener('click', function() {
                        // Populate modal with selected row data
                        document.getElementById('modalWatchName').textContent = this.dataset.name;
                        document.getElementById('modalWatchDescription').textContent = this.dataset.description;
                        document.getElementById('modalWatchCategory').textContent = this.dataset.category;
                        document.getElementById('modalWatchPrice').textContent = this.dataset.price;
                        document.getElementById('modalWatchImage').src = this.dataset.image;
                        document.getElementById('modalWatchImage').alt = this.dataset.name;
                    
                        // Update specifications title to include the name + "Specifications"
                        document.getElementById('modalWatchSpecsTitle').textContent = `${this.dataset.name} Specifications`;
                        


                        // Show the modal
                        $('#watchModal').modal('show');
                    });

                    // Append the row to the table body
                    tableBody.appendChild(tr);
                }
            });
        })
        .catch(error => console.error('Error loading CSV file:', error));
});
