// App State Management
class PortfolioApp {
    constructor() {
        this.state = {
            projects: [],
            projectSidebarVisible: false,
            sections: ['bio', 'resume', 'projects', 'hobbies', 'contact'],
            mobileMenuOpen: false
        };
        
        this.elements = {
            sidebar: document.getElementById('sidebar'),
            overlay: document.getElementById('menu-overlay'),
            menuToggle: document.getElementById('menu-toggle'),
            projectSidebar: document.getElementById('project-sidebar'),
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
            
            if (this.state.projectSidebarVisible && this.isMobile()) {
                this.toggleProjectSidebar(false);
            }
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
        
        const projectNav = document.getElementById('project-nav');
        projectNav.innerHTML = '';
        
        app.state.projects.forEach(project => {
            // Create navigation link
            const link = document.createElement('a');
            link.href = `#${project.id}`;
            link.className = `project-link ${project.id}`;
            link.textContent = project.name;
            projectNav.appendChild(link);
            
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
            app.executeScripts(section);
            attachProjectLinkHandlers();
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
    
    if (tabId === 'projects') {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) projectsSection.style.display = 'block';
        toggleProjectSidebar(true);
    } else {
        const target = document.getElementById(tabId);
        if (target) {
            target.style.display = 'block';
            
            if (target.classList.contains('project-section')) {
                loadProjectContent(tabId);
            }
        }
        
        if (!app.state.projects.some(p => p.id === tabId)) {
            toggleProjectSidebar(false);
        }
    }
    
    if (app.isMobile()) {
        window.scrollTo(0, 0);
    }
}

function toggleProjectSidebar(show) {
    if (show !== undefined) {
        app.state.projectSidebarVisible = show;
    } else {
        app.state.projectSidebarVisible = !app.state.projectSidebarVisible;
    }
    
    if (app.isMobile()) {
        if (app.state.projectSidebarVisible) {
            app.elements.projectSidebar.classList.add('show');
            app.elements.sidebar.classList.remove('show');
        } else {
            app.elements.projectSidebar.classList.remove('show');
        }
    } else {
        app.elements.projectSidebar.classList.toggle('show', app.state.projectSidebarVisible);
    }
}

function attachProjectLinkHandlers() {
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tab = link.getAttribute('href').substring(1);
            showTab(tab);
            
            if (app.isMobile()) {
                setTimeout(() => toggleProjectSidebar(false), 300);
            }
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
        app.elements.projectSidebar.classList.remove('show');
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
    
    // Project sidebar mouse leave handler (desktop only)
    app.elements.projectSidebar.addEventListener('mouseleave', () => {
        if (!app.isMobile()) {
            app.state.projectSidebarVisible = false;
            app.elements.projectSidebar.classList.remove('show');
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});




// Content loading events
document.addEventListener('contentLoaded', function() {
    if (document.querySelector('#keyboard-project .carousel-container')) {
        loadCarouselGallery({
            directory: 'content/projects/keyboard/data',
            namePattern: 'keyboard',
            numberFormat: 'parentheses',
            containerSelector: '#keyboard-project .carousel-container',
            maxImages: 100,
        });
    }
});