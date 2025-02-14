// casestudies.js (loaded as a module)
// Use CASE_STUDY_FIELDS to generate forms, collect data, etc.
import { CASE_STUDY_FIELDS } from './constants.js';

// ----- Attach functions to window for inline event handlers ----- //
window.createNewCaseStudy = createNewCaseStudy;
window.cancelCreate = cancelCreate;
window.cancelEdit = cancelEdit;
window.editCaseStudy = editCaseStudy;
window.deleteCaseStudy = deleteCaseStudy;

// ----- Initialization after DOM loads ----- //
document.addEventListener('DOMContentLoaded', () => {
  // Generate form fields for create & edit forms
  generateFormFields('createCaseStudyForm', 'create');
  generateFormFields('editCaseStudyForm', 'edit');

  // Attach event listeners for form submissions
  const createForm = document.getElementById('createCaseStudyForm');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newCaseStudy = getFormData('createCaseStudyForm', 'create');
      try {
        await createCaseStudy(newCaseStudy); // Assumes createCaseStudy is defined elsewhere
        await fetchAndDisplayCaseStudies();
        cancelCreate();
      } catch (error) {
        console.error('Error creating case study:', error);
        alert('Failed to create case study');
      }
    });
  }

  const editForm = document.getElementById('editCaseStudyForm');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updatedCaseStudy = getFormData('editCaseStudyForm', 'edit');
      const idField = document.getElementById('editId');
      if (idField) {
        updatedCaseStudy.id = idField.value;
      }
      try {
        await updateCaseStudy(updatedCaseStudy); // Assumes updateCaseStudy is defined elsewhere
        await fetchAndDisplayCaseStudies();
        cancelEdit();
      } catch (error) {
        console.error('Error updating case study:', error);
        alert('Failed to update case study');
      }
    });
  }

  // Fetch and display case studies when the page loads
  fetchAndDisplayCaseStudies();
});

// ----- Functions ----- //

// Delete a case study
async function deleteCaseStudy(id) {
    try {
      if (!confirm('Are you sure you want to delete this case study?')) return;
      await deleteCaseStudyFromServer(id);
      await fetchAndDisplayCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      alert('Failed to delete case study.');
    }
  }
// Fetch and display case studies
async function fetchAndDisplayCaseStudies() {
  try {
    const caseStudies = await fetchCaseStudies();
    const container = document.getElementById('caseStudiesList');
    container.innerHTML = '';

    caseStudies.forEach(caseStudy => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');
      card.innerHTML = `
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">${caseStudy.title}</h5>
            <p class="card-text">${caseStudy.subtitle}</p>
            <div class="btn-group">
              <a href="/case-study/${caseStudy.id}" target="_blank" class="btn btn-sm btn-outline-primary">View</a>
              <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${caseStudy.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${caseStudy.id}">Delete</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach event listeners for dynamic buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editCaseStudy(btn.dataset.id);
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteCaseStudy(btn.dataset.id);
      });
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    alert('Failed to load case studies.');
  }
}

// Generate form fields for a given form ID and prefix, and append buttons
function generateFormFields(formId, prefix) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Clear any existing content to avoid duplicates
    form.innerHTML = '';
  
    // Create input fields based on CASE_STUDY_FIELDS
    CASE_STUDY_FIELDS.forEach(field => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'mb-3';
      fieldWrapper.innerHTML = `
        <label for="${prefix}${field}" class="form-label">${field}</label>
        <input type="text" id="${prefix}${field}" class="form-control" required>
      `;
      form.appendChild(fieldWrapper);
    });
  
    // For the edit form, add a hidden input for the case study ID
    if (prefix === 'edit') {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.id = 'editId';
      form.appendChild(hiddenInput);
    }
  
    // Append submit and cancel buttons depending on the form type
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'd-flex gap-2';
    if (prefix === 'create') {
      buttonGroup.innerHTML = `
        <button type="submit" class="btn btn-primary">Create</button>
        <button type="button" class="btn btn-secondary" onclick="cancelCreate()">Cancel</button>
      `;
    } else if (prefix === 'edit') {
      buttonGroup.innerHTML = `
        <button type="submit" class="btn btn-success">Save Changes</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
      `;
    }
    form.appendChild(buttonGroup);
  }
  

// Collect form data from inputs with a given form ID and prefix
function getFormData(formId, prefix) {
  const data = {};
  CASE_STUDY_FIELDS.forEach(field => {
    const input = document.getElementById(`${prefix}${field}`);
    if (input) {
      data[field] = input.value;
    }
  });
  return data;
}

// Populate the edit form with data fetched by ID
async function editCaseStudy(id) {
    try {
      // Fetch case study data
      const caseStudy = await fetchCaseStudyById(id);
      const editForm = document.getElementById('editCaseStudyForm');
      const editContainer = document.getElementById('editFormContainer');
      
      if (!editForm || !editContainer) {
        console.error("Edit form or container not found.");
        return;
      }
      
      // Reset the form first before populating it
      editForm.reset();
  
      // Populate the form fields with the data
      CASE_STUDY_FIELDS.forEach(field => {
        const inputElement = editForm.querySelector(`#edit${field}`);
        if (inputElement) {
          inputElement.value = caseStudy[field] || '';
        } else {
          console.warn(`Missing form field: #edit${field}`);
        }
      });
  
      // Set hidden ID field
      const idField = editForm.querySelector('#editId');
      if (idField) idField.value = id;
  
      // Show the form
      editContainer.classList.toggle('d-none', false);
    } catch (error) {
      console.error('Error fetching case study for edit:', error);
      alert('Failed to load case study for editing.');
    }
  }
  
  
// Hide the edit form and reset its content
function cancelEdit() {
    const editForm = document.getElementById('editCaseStudyForm');
    const editContainer = document.getElementById('editFormContainer');
    
    if (editForm) {
      editForm.reset(); // Clear the form fields
    }
    
    // Hide the edit form container
    editContainer.classList.add('d-none');
  }
  
// Show the create form container and reset the form
function createNewCaseStudy() {
    const createForm = document.getElementById('createCaseStudyForm');
    const createContainer = document.getElementById('createFormContainer');
    
    if (createForm) {
      createForm.reset(); // Clear the form fields
    }
  
    // Show the create form container
    createContainer.classList.remove('d-none');
  }
  

// Hide the create new case study form and reset the form fields
function cancelCreate() {
    const createForm = document.getElementById('createCaseStudyForm');
    const createContainer = document.getElementById('createFormContainer');
    
    if (createForm) {
      createForm.reset(); // Clear the form fields
    }
  
    // Hide the create form container
    createContainer.classList.add('d-none');
  }
  