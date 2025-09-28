// App State Management
class PortfolioApp {
    constructor() {
        this.state = {
            projects: [],
            sections: ['bio', 'resume', 'projects', 'hobbies', 'contact'],
            mobileMenuOpen: false
        };
        
        this.elements = {
            sidebar: document.getElementById('sidebar'),
            overlay: document.getElementById('menu-overlay'),
            menuToggle: document.getElementById('menu-toggle'),
            main: document.querySelector('main')
        };
    }
    
    isMobile() {
        return window.innerWidth <= 768;
    }
    
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            script.parentNode.replaceChild(newScript, script);
        });
    }
    
    toggleMobileMenu() {
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        const { sidebar, overlay, menuToggle } = this.elements;
        
        if (this.state.mobileMenuOpen) {
            sidebar.classList.add('show');
            overlay.classList.add('show');
            menuToggle.innerHTML = '✕';
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            menuToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        }
    }
}

// Initialize app instance
const app = new PortfolioApp();

// Load all main sections from content folder
async function loadMainSections() {
    app.elements.main.innerHTML = '';
    
    for (const section of app.state.sections) {
        const div = document.createElement('div');
        div.id = section;
        div.className = 'tab-section';
        div.style.display = section === 'bio' ? 'block' : 'none';
        
        try {
            const response = await fetch(`content/${section}/content.html`);
            
            if (response.ok) {
                const content = await response.text();
                div.innerHTML = content;
                app.executeScripts(div);
            } else {
                div.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Content not found. Please add content.html to content/${section}/</p>`;
            }
        } catch (error) {
            div.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Error loading content.</p>`;
            console.error(`Error loading ${section}:`, error);
        }
        
        app.elements.main.appendChild(div);
    }
}

// Load projects from configuration or use defaults
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (response.ok) {
            app.state.projects = await response.json();
        } else {
            console.log('No projects.json found');
        }
        
        app.state.projects.forEach(project => {
            // Create project section
            const section = document.createElement('div');
            section.id = project.id;
            section.className = 'tab-section project-section';
            section.style.display = 'none';
            section.innerHTML = `<h2>${project.name}</h2><p>Loading project content...</p>`;
            
            app.elements.main.appendChild(section);
        });
        
        attachProjectLinkHandlers();
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load project content from folder
async function loadProjectContent(projectId) {
    const project = app.state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const section = document.getElementById(projectId);
    
    try {
        const response = await fetch(`content/projects/${project.folder}/content.html`);
        
        if (response.ok) {
            const content = await response.text();
            section.innerHTML = content;
            
            // Wait for DOM to be ready, then execute scripts
            setTimeout(() => {
                app.executeScripts(section);
                attachProjectLinkHandlers();
                
                // Dispatch custom event for carousel initialization
                const event = new CustomEvent('projectContentLoaded', {
                    detail: { projectId, section }
                });
                document.dispatchEvent(event);
            }, 100);
        } else {
            section.innerHTML = `
                <h2>${project.name}</h2>
                <p>Project content not found. Please add content.html to projects/${project.folder}/</p>
            `;
        }
    } catch (error) {
        section.innerHTML = `
            <h2>${project.name}</h2>
            <p>Error loading project content.</p>
        `;
        console.error('Error loading project content:', error);
    }
}

function showTab(tabId) {
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(section => section.style.display = 'none');
    
    if (app.isMobile() && app.state.mobileMenuOpen) {
        app.toggleMobileMenu();
    }
    
    const target = document.getElementById(tabId);
    if (target) {
        target.style.display = 'block';
        
        if (target.classList.contains('project-section')) {
            loadProjectContent(tabId);
        }
    }
    
    if (app.isMobile()) {
        window.scrollTo(0, 0);
    }
}


function attachProjectLinkHandlers() {
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tab = link.getAttribute('href').substring(1);
            showTab(tab);
        });
    });
}

// Handle window resize
function handleResize() {
    if (!app.isMobile() && app.state.mobileMenuOpen) {
        app.toggleMobileMenu();
    }
    
    if (!app.isMobile()) {
        app.elements.sidebar.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load main sections first
    await loadMainSections();
    
    // Then load projects
    await loadProjects();
    
    // Show bio by default
    showTab('bio');
    
    // Mobile menu toggle
    app.elements.menuToggle.addEventListener('click', () => app.toggleMobileMenu());
    app.elements.overlay.addEventListener('click', () => app.toggleMobileMenu());
    
    // Main navigation handlers
    document.querySelectorAll('#sidebar nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tab = link.getAttribute('href').substring(1);
            showTab(tab);
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});




// Enhanced carousel loading for project content
document.addEventListener('projectContentLoaded', function(event) {
    const { projectId, section } = event.detail;
    
    // Clean up any existing carousels in the section
    const existingCarousels = section.querySelectorAll('.carousel-container');
    existingCarousels.forEach(container => {
        // Clear any existing carousel content
        container.innerHTML = '';
    });
    
    // Initialize carousels based on project type
    setTimeout(() => {
        initializeProjectCarousels(projectId, section);
    }, 50);
});

function initializeProjectCarousels(projectId, section) {
    // Find the project configuration
    const project = app.state.projects.find(p => p.id === projectId);
    if (!project) return;

    // Look for any carousel containers in this section
    const carouselContainers = section.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        // Get the carousel ID from the parent element
        const parentWithId = container.closest('[id]');
        if (!parentWithId) return;

        const carouselId = parentWithId.id;
        const containerSelector = `#${carouselId} .carousel-container`;

        // Special handling for miscellaneous project
        if (project.folder === 'miscellaneous') {
            initializeMiscellaneousCarousel(containerSelector);
        } else {
            try {
                loadCarouselGallery({
                    directory: 'data/',
                    namePattern: project.folder, // Use folder name as image pattern
                    numberFormat: 'parentheses',
                    containerSelector: containerSelector,
                    maxImages: 100,
                });
            } catch (error) {
                console.error(`Error loading ${project.folder} carousel:`, error);
                container.innerHTML = '<p>Error loading image gallery</p>';
            }
        }
    });
}

// Special carousel for miscellaneous project - loads images from explicit list
async function initializeMiscellaneousCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '<div class="carousel-loading">Loading miscellaneous images...</div>';

    try {
        // Find the miscellaneous project configuration
        const miscProject = app.state.projects.find(p => p.folder === 'miscellaneous');
        if (!miscProject || !miscProject.miscImages) {
            container.innerHTML = '<div class="carousel-loading">No miscellaneous images configured</div>';
            return;
        }

        // Create a custom carousel that loads the specified images
        const miscCarousel = new CarouselGallery({
            containerSelector: containerSelector,
            directory: 'data',
            namePattern: '',  // We'll override the loading logic
            maxImages: 0,     // We'll handle this ourselves
        });

        // Override the loadImages method to load specified images
        miscCarousel.loadImages = async function() {
            const extensions = this.settings.extensions;
            const loadedImages = [];

            // Load each specified image pattern
            for (const pattern of miscProject.miscImages) {
                // Try numbered images first (e.g., "bedframe (1).jpg", "bedframe (2).jpg")
                for (let i = 1; i <= 20; i++) {
                    for (const ext of extensions) {
                        const testFilename = `${pattern} (${i}).${ext}`;
                        const imagePath = `${this.settings.directory}/${testFilename}`;

                        try {
                            const img = new Image();
                            await new Promise((resolve, reject) => {
                                img.onload = () => {
                                    loadedImages.push({
                                        src: imagePath,
                                        alt: `${pattern.replace(/_/g, ' ')} ${i}`,
                                        filename: testFilename,
                                        width: img.naturalWidth,
                                        height: img.naturalHeight,
                                        aspectRatio: img.naturalWidth / img.naturalHeight
                                    });
                                    resolve();
                                };
                                img.onerror = () => reject();
                                img.src = imagePath;
                            });
                        } catch (error) {
                            // Image doesn't exist, continue
                        }
                    }
                }

                // Also try single images without numbers (e.g., "diploma.jpg")
                for (const ext of extensions) {
                    const testFilename = `${pattern}.${ext}`;
                    const imagePath = `${this.settings.directory}/${testFilename}`;

                    try {
                        const img = new Image();
                        await new Promise((resolve, reject) => {
                            img.onload = () => {
                                // Avoid duplicates
                                if (!loadedImages.find(existingImg => existingImg.src === imagePath)) {
                                    loadedImages.push({
                                        src: imagePath,
                                        alt: pattern.replace(/_/g, ' '),
                                        filename: testFilename,
                                        width: img.naturalWidth,
                                        height: img.naturalHeight,
                                        aspectRatio: img.naturalWidth / img.naturalHeight
                                    });
                                }
                                resolve();
                            };
                            img.onerror = () => reject();
                            img.src = imagePath;
                        });
                    } catch (error) {
                        // Image doesn't exist, continue
                    }
                }
            }

            this.images = loadedImages;

            if (loadedImages.length > 0) {
                this.buildCarousel();
            } else {
                container.innerHTML = '<div class="carousel-loading">No miscellaneous images found</div>';
            }
        };

        // Start the loading process
        miscCarousel.loadImages();

    } catch (error) {
        console.error('Error loading miscellaneous carousel:', error);
        container.innerHTML = '<p>Error loading miscellaneous image gallery</p>';
    }
}

// Fallback for direct page loads (not navigation)
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all content is loaded
    setTimeout(() => {
        // Find all carousel containers that haven't been initialized
        const emptyCarousels = document.querySelectorAll('.carousel-container:empty, .carousel-container:not(:has(*))');

        emptyCarousels.forEach(container => {
            const parentWithId = container.closest('[id]');
            if (!parentWithId) return;

            // Try to determine which project this carousel belongs to
            app.state.projects.forEach(project => {
                // Check if the carousel ID contains the project name
                const carouselId = parentWithId.id;
                if (carouselId.includes(project.folder) || carouselId.includes(project.name.toLowerCase().replace(/\s+/g, ''))) {
                    const containerSelector = `#${carouselId} .carousel-container`;

                    // Special handling for miscellaneous project
                    if (project.folder === 'miscellaneous') {
                        initializeMiscellaneousCarousel(containerSelector);
                    } else {
                        try {
                            loadCarouselGallery({
                                directory: 'data/',
                                namePattern: project.folder,
                                numberFormat: 'parentheses',
                                containerSelector: containerSelector,
                                maxImages: 100,
                            });
                        } catch (error) {
                            console.error(`Error loading ${project.folder} carousel on page load:`, error);
                        }
                    }
                }
            });
        });
    }, 500);
});