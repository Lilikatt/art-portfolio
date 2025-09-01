// Load project data from JSON file
async function loadProjectData() {
    try {
        // Get the project filename from the current page URL
        const currentPage = window.location.pathname.split('/').pop();
        const projectJsonFile = currentPage.replace('.html', '.json');
        
        console.log('Loading project data from:', projectJsonFile);
        
        const response = await fetch(projectJsonFile);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw JSON response:', text);
        
        const projectData = JSON.parse(text);
        console.log('Parsed project data:', projectData);
        
        // Load the project content
        loadProject(projectData);
        
        // Update page title
        document.title = `${projectData.title} - Lili Ibrahim`;
        
    } catch (error) {
        console.error('Error loading project data:', error);
        loadErrorMessage();
    }
}

// Load project content into the page
function loadProject(projectData) {
    const contentContainer = document.getElementById('project-content');
    if (!contentContainer) {
        console.error('Project content container not found');
        return;
    }
    
    // Create title
    const title = document.createElement('h1');
    title.className = 'project-title';
    title.textContent = projectData.title;
    
    // Create description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'project-description';
    
    projectData.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        descriptionDiv.appendChild(p);
    });
    
    // Create images section
    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'project-images';
    
    projectData.images.forEach(imageData => {
        const imageItem = document.createElement('div');
        imageItem.className = 'project-image';
        
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.loading = 'lazy';
        
        imageItem.appendChild(img);
        imagesDiv.appendChild(imageItem);
    });
    
    // Add everything to the container
    contentContainer.appendChild(title);
    contentContainer.appendChild(descriptionDiv);
    contentContainer.appendChild(imagesDiv);
    
    console.log('Project content loaded successfully');
}

// Show error message if JSON loading fails
function loadErrorMessage() {
    const contentContainer = document.getElementById('project-content');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div class="project-container">
                <h1 class="project-title">Project Not Found</h1>
                <div class="project-description">
                    <p>Sorry, this project page couldn't be loaded. Please check that the corresponding JSON file exists.</p>
                </div>
            </div>
        `;
    }
}

// Load project when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, loading project data...');
    loadProjectData();
});

// Mobile navigation functionality (copied from main script)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }
});
