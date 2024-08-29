function handleRowClick() {
    const tableRows = document.querySelectorAll('#watches-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Populate modal with selected row data
            document.getElementById('modalWatchName').textContent = this.dataset.name;
            document.getElementById('modalWatchDescription').textContent = this.dataset.description;
            document.getElementById('modalWatchCategory').textContent = this.dataset.category;
            document.getElementById('modalWatchPrice').textContent = this.dataset.price;
            document.getElementById('modalWatchImage').src = this.dataset.image;
            document.getElementById('modalWatchImage').alt = this.dataset.name;

            // Update specifications title to include the name + "Specifications"
            document.getElementById('modalWatchSpecsTitle').textContent = `${this.dataset.name} Specifications`;

            // Clear previous specifications
            const specsList = document.getElementById('modalWatchSpecs');
            specsList.innerHTML = ''; // Clear any previous items

            // Add specifications from the CSV (assuming they are separated by semicolons)
            const specs = this.dataset.specs ? this.dataset.specs.split(';') : [];
            specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec.trim(); // Add each spec as a list item
                specsList.appendChild(li);
            });

            // Show the modal
            $('#watchModal').modal('show');
        });
    });
}
