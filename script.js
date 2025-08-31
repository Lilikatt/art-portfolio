// Load portfolio data from JSON file
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Get the text first to see what we're actually getting
        const text = await response.text();
        console.log('Raw JSON response:', text);
        
        // Then parse it
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        
        // Load video games
        if (data.videogames) {
            loadVideogames(data.videogames);
        }
        
        // Load illustrations
        if (data.illustrations) {
            loadIllustrations(data.illustrations);
        }
        
        // Load about section
        if (data.about) {
            loadAbout(data.about);
        }
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        console.error('Error details:', error.message);
        // Fallback: load default content if JSON fails
        loadDefaultContent();
    }
}

// Load video games from data
function loadVideogames(videogames) {
    const videogamesGrid = document.getElementById('videogames-grid');
    if (!videogamesGrid) {
        console.log('videogames-grid element not found');
        return;
    }
    
    videogamesGrid.innerHTML = '';
    
    videogames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'videogame-item';
        gameElement.innerHTML = `
            <div class="portfolio-item clickable" onclick="window.location.href='${game.projectPage}'">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="videogame-title">
                <h3>${game.title}</h3>
            </div>
        `;
        videogamesGrid.appendChild(gameElement);
    });
    
    console.log(`Loaded ${videogames.length} video games`);
}

// Load illustrations from data
function loadIllustrations(illustrations) {
    const illustrationsGrid = document.getElementById('illustrations-grid');
    if (!illustrationsGrid) {
        console.log('illustrations-grid element not found');
        return;
    }
    
    illustrationsGrid.innerHTML = '';
    
    illustrations.forEach(illustration => {
        const illustrationElement = document.createElement('div');
        illustrationElement.className = 'illustration-item';
        illustrationElement.innerHTML = `
            <div class="illustration-image">
                <img src="${illustration.image}" alt="${illustration.title}">
            </div>
            <div class="illustration-info">
                <h3>${illustration.title}</h3>
            </div>
        `;
        illustrationsGrid.appendChild(illustrationElement);
    });
    
    console.log(`Loaded ${illustrations.length} illustrations`);
}

// Load about section from data
function loadAbout(aboutData) {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent) {
        console.log('about-content element not found');
        return;
    }
    
    if (!aboutData) {
        console.log('No about data provided');
        return;
    }
    
    // Create paragraphs
    const paragraphsHTML = aboutData.paragraphs.map(paragraph => 
        `<p>${paragraph}</p>`
    ).join('');
    
    aboutContent.innerHTML = `
        <div class="about-text">
            <h2>${aboutData.title}</h2>
            ${paragraphsHTML}
        </div>
    `;
    
    console.log('Loaded about section');
}

// Fallback content if JSON loading fails
function loadDefaultContent() {
    console.log('Loading fallback content...');
    
    // Load some basic fallback content
    const videogamesGrid = document.getElementById('videogames-grid');
    if (videogamesGrid) {
        videogamesGrid.innerHTML = '<p>Error loading video games. Please check your data.json file.</p>';
    }
    
    const illustrationsGrid = document.getElementById('illustrations-grid');
    if (illustrationsGrid) {
        illustrationsGrid.innerHTML = '<p>Error loading illustrations. Please check your data.json file.</p>';
    }
    
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = `
            <div class="about-text">
                <h2>About</h2>
                <p>Error loading about section. Please check your data.json file.</p>
            </div>
        `;
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting to load portfolio data...');
    loadPortfolioData();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

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

// Animate portfolio items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items when page loads
window.addEventListener('load', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
