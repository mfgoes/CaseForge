const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { generateCaseStudyTemplate } = require('./utils/template');

const app = express();
const PORT = 3000;

// Path configurations
const CASE_STUDIES_JSON = path.join(__dirname, 'case-studies', 'case-studies.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
// Middleware
app.use(express.static(PUBLIC_DIR));
app.use(express.json());

// --------------------------
// API Endpoints (Grouped)
// --------------------------
app.get('/api/case-studies', async (req, res) => {
    try {
        const data = await fs.readFile(CASE_STUDIES_JSON, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading case studies:', err);
        res.status(500).json({ error: 'Failed to load case studies' });
    }
});

app.post('/api/update-case-study', async (req, res) => {
    try {
        const updatedCaseStudy = req.body;
        const data = await fs.readFile(CASE_STUDIES_JSON, 'utf8');
        const caseStudies = JSON.parse(data);
        
        const index = caseStudies.findIndex(cs => cs.id === updatedCaseStudy.id);
        if (index === -1) return res.status(404).json({ error: 'Case study not found' });
        
        caseStudies[index] = updatedCaseStudy;
        await fs.writeFile(CASE_STUDIES_JSON, JSON.stringify(caseStudies, null, 2));
        res.json({ message: 'Case study updated successfully' });
    } catch (err) {
        console.error('Error updating case study:', err);
        res.status(500).json({ error: 'Error updating case study' });
    }
});

// Add this with your other API endpoints
app.post('/api/create-case-study', async (req, res) => {
    try {
        const newCaseStudy = req.body;
        const data = await fs.readFile(CASE_STUDIES_JSON, 'utf8');
        const caseStudies = JSON.parse(data);

        // Generate unique ID
        newCaseStudy.id = Date.now().toString();
        
        caseStudies.push(newCaseStudy);
        
        await fs.writeFile(
            CASE_STUDIES_JSON,
            JSON.stringify(caseStudies, null, 2),
            'utf8'
        );
        
        res.status(201).json({ 
            message: 'Case study created successfully',
            id: newCaseStudy.id
        });
        
    } catch (err) {
        console.error('Error creating case study:', err);
        res.status(500).json({ error: 'Error creating case study' });
    }
});

// Page Routes
app.get('/case-study/:id', async (req, res) => {
    try {
        const data = await fs.readFile(CASE_STUDIES_JSON, 'utf8');
        const caseStudy = JSON.parse(data).find(cs => cs.id === req.params.id);
        if (!caseStudy) return res.status(404).send('Case study not found');
        res.send(generateCaseStudyTemplate(caseStudy));
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error loading case study');
    }
});

app.get(['/', '/about'], (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/case-studies', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'casestudies.html'));
});


app.delete('/api/delete-case-study/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await fs.readFile(CASE_STUDIES_JSON, 'utf8');
        let caseStudies = JSON.parse(data);

        // Find the case study and remove it
        const index = caseStudies.findIndex(cs => cs.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Case study not found' });
        }

        caseStudies.splice(index, 1); // Remove the case study

        // Write the updated case studies back to the file
        await fs.writeFile(CASE_STUDIES_JSON, JSON.stringify(caseStudies, null, 2), 'utf8');
        res.status(200).json({ message: 'Case study deleted successfully' });
    } catch (err) {
        console.error('Error deleting case study:', err);
        res.status(500).json({ error: 'Error deleting case study' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});

