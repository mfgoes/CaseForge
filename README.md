# CaseForge  

**A Dynamic Case Study Template for Showcasing Projects**  

CaseForge is a template-based site for structuring and displaying case studies. The current implementation focuses on watches, but the framework can be adapted for UX portfolios, product design showcases, and more.  

## Features  

- **Templated Case Studies** – Predefined structure to present project details effectively.
- **Mobile-first styling using Bootstrap 5** – Modern industry standard UI.  
- **Express-Powered Backend** – Lightweight server setup to manage and serve content.  
- **Flexible Rendering** – Hardcoded HTML currently, but planned enhancements for dynamic form-based case creation.  

## Current Status  

The project is in its **initial phase**, with case studies manually written in HTML. This approach helps visualize the UX structure before transitioning to a form-driven system.  

A future update will introduce a **section-based dynamic form** for defining case studies, allowing users to select:  
- Project details (name, year, client, banner)  
- Section types:  
  - Header + text + image  
  - Two images side by side  
  - Three images side by side  
  - Full-width quote  

This system will enable flexible, reusable case study pages. However, it is **not yet implemented** in the current version.  

## Tech Stack  

- **Frontend:** HTML, CSS (SCSS), JavaScript  
- **Backend:** Express.js  
- **Data Handling:** JSON-based structure for templating case studies  

- [Node.js](https://nodejs.org/)  
- [Nodemon](https://nodemon.io/) (for automatic server restarts)  
- [Express.js](https://expressjs.com/)

## How to Use  

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/mfgoes/caseforge.git
   cd caseforge```
 2. Install Dependencies
 3. Run the Server (with Nodemon)
   ```npm run dev```
 4. Access the Site
    Open [http://localhost:3000/casestudies.html](http://localhost:3000/casestudies.html) in your browser.

  ##Stay tuned for updates! 🚀
