// Function to delete a case study
async function deleteCaseStudy(id) {
    try {
        // Confirm deletion
        const confirmDelete = confirm('Are you sure you want to delete this case study?');
        if (!confirmDelete) return;

        // Call the delete function from cases_crud.js
        await deleteCaseStudyFromServer(id); // Renamed to avoid recursion

        // Refresh the case studies list
        await fetchAndDisplayCaseStudies();
    } catch (error) {
        console.error('Error deleting case study:', error);
        alert('Failed to delete case study. Please try again.');
    }
}

// Function to fetch and display case studies
async function fetchAndDisplayCaseStudies() {
    try {
        const response = await fetch('/api/case-studies');
        if (!response.ok) throw new Error('Failed to fetch case studies');

        const caseStudies = await response.json();
        const container = document.getElementById('caseStudiesList');

        // Clear existing content
        container.innerHTML = '';

        // Generate HTML for each case study
        caseStudies.forEach(caseStudy => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <h5 class="card-title">${caseStudy.title}</h5>
                            <p class="card-text">${caseStudy.subtitle}</p>
                            <div class="btn-group">
                                <a href="/case-study/${caseStudy.id}" target="_blank" class="btn btn-sm btn-outline-primary">View</a>
                                <button onclick="editCaseStudy('${caseStudy.id}')" class="btn btn-sm btn-outline-secondary">Edit</button>
                                <button onclick="deleteCaseStudy('${caseStudy.id}')" class="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error('Error fetching case studies:', error);
        alert('Failed to load case studies. Please try again later.');
    }
}

// Load case studies when the page loads
window.onload = fetchAndDisplayCaseStudies;