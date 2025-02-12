// Fetch all case studies
async function fetchCaseStudies() {
    try {
        const response = await fetch("/api/case-studies");
        if (!response.ok) {
            throw new Error("Failed to fetch case studies.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching case studies:", error);
        throw error;
    }
}

// Fetch a single case study by ID
async function fetchCaseStudyById(id) {
    try {
        const response = await fetch(`/api/case-studies`);
        if (!response.ok) {
            throw new Error("Failed to fetch case study details.");
        }
        const caseStudies = await response.json();
        return caseStudies.find((cs) => cs.id === id);
    } catch (error) {
        console.error("Error fetching case study:", error);
        throw error;
    }
}

// Update a case study
async function updateCaseStudy(updatedCaseStudy) {
    try {
        const response = await fetch("/api/update-case-study", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCaseStudy),
        });

        if (!response.ok) {
            throw new Error("Failed to update case study.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating case study:", error);
        throw error;
    }
}

// Delete case study
async function deleteCaseStudyFromServer(id) {
    try {
        const response = await fetch(`/api/delete-case-study/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete case study');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting case study:', error);
        throw error;
    }
}

// Create a new case study
async function createCaseStudy(newCaseStudy) {
    try {
        const response = await fetch('/api/create-case-study', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCaseStudy)
        });

        if (!response.ok) {
            throw new Error('Failed to create case study');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating case study:', error);
        throw error;
    }
}

