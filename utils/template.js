const generateCaseStudyTemplate = (caseStudy) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${caseStudy.title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">Portfolio</a>
            <a class="nav-link" href="/case-studies">Case Studies</a>
        </div>
    </nav>
    
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-body">
                <h1 class="display-4">${caseStudy.title}</h1>
                <p class="lead">${caseStudy.subtitle}</p>
                <div class="content mt-4">
                    ${caseStudy.content || '<p>Content coming soon</p>'}
                </div>
                <a href="/case-studies" class="btn btn-primary mt-4">Back to Overview</a>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;

module.exports = { generateCaseStudyTemplate };