// Load portfolio data from JSON file
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Load video games
        loadVideogames(data.videogames);
        
        // Load illustrations
        loadIllustrations(data.illustrations);
        
        // Load about section
        loadAbout(data.about);
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback: load default content if JSON fails
        loadDefaultContent();
    }
}

// Load video games from data
function loadVideogames(videogames) {
    const videogamesGrid = document.getElementById('videogames-grid');
    if (!videogamesGrid) return;
    
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
}

// Load illustrations from data
function loadIllustrations(illustrations) {
    const illustrationsGrid = document.getElementById('illustrations-grid');
    if (!illustrationsGrid) return;
    
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
}

// Load about section from data
function loadAbout(aboutData) {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent || !aboutData) return;
    
    // Create paragraphs
    const paragraphsHTML = aboutData.paragraphs.map(paragraph => 
        `<p>${paragraph}</p>`
    ).join('');
    
    // Create social links
    const socialLinksHTML = aboutData.contact.social.map(social => 
        `<a href="${social.url}" target="_blank">${social.name}</a>`
    ).join('');
    
    aboutContent.innerHTML = `
        <div class="about-text">
            <h2>${aboutData.title}</h2>
            ${paragraphsHTML}
            
            <div class="contact-info">
                <h3>Let's Connect</h3>
                <p><strong>Email:</strong> <a href="mailto:${aboutData.contact.email}">${aboutData.contact.email}</a></p>
                <p><strong>Location:</strong> ${aboutData.contact.location}</p>
                <div class="social-links">
                    ${socialLinksHTML}
                </div>
            </div>
        </div>
    `;
}

// Fallback content if JSON loading fails
function loadDefaultContent() {
    // This would load some basic content if the JSON file isn't found
    console.log('Loading fallback content...');
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Contact form handling (basic)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // For now, just show success message
        // In production, you'd send this to a server or email service
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

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
