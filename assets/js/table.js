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
