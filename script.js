let projects = [];
let projectSidebarVisible = false;
let sections = ['bio', 'resume', 'projects', 'hobbies', 'contact'];
let mobileMenuOpen = false;

// Function to execute scripts in dynamically loaded content
function executeScripts(container) {
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

// Mobile menu handling
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('menu-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (mobileMenuOpen) {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        menuToggle.innerHTML = '✕';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
        
        // Also close project sidebar if open
        if (projectSidebarVisible && window.innerWidth <= 768) {
            toggleProjectSidebar(false);
        }
    }
}

// Check if we're on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Load all main sections from content folder
async function loadMainSections() {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear loading message
    
    for (const section of sections) {
        const div = document.createElement('div');
        div.id = section;
        div.className = 'tab-section';
        div.style.display = section === 'bio' ? 'block' : 'none';
        
        try {
            // Try to load content.html from section folder
            let response = await fetch(`content/${section}/content.html`);
            
            if (response.ok) {
                const content = await response.text();
                div.innerHTML = content;
                // Execute any scripts in the loaded content
                executeScripts(div);
            } else {
                div.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Content not found. Please add content.html to content/${section}/</p>`;
            }
        } catch (error) {
            div.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Error loading content.</p>`;
            console.error(`Error loading ${section}:`, error);
        }
        
        main.appendChild(div);
    }
}

// Load projects from configuration or use defaults
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            console.log('No projects.json found');
        } else {
            projects = await response.json();
        }
        
        // Create project navigation links
        const projectNav = document.getElementById('project-nav');
        projectNav.innerHTML = '';
        
        const main = document.querySelector('main');
        
        projects.forEach(project => {
            // Create navigation link
            const link = document.createElement('a');
            link.href = `#${project.id}`;
            link.className = 'project-link';
            link.textContent = project.name;
            projectNav.appendChild(link);
            
            // Create project section
            const section = document.createElement('div');
            section.id = project.id;
            section.className = 'tab-section project-section';
            section.style.display = 'none';
            
            // Add loading message
            section.innerHTML = `<h2>${project.name}</h2><p>Loading project content...</p>`;
            
            main.appendChild(section);
        });
        
        // Add click handlers to project links
        attachProjectLinkHandlers();
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load project content from folder
async function loadProjectContent(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const section = document.getElementById(projectId);
    
    try {
        // Try to load content.html from project folder
        let response = await fetch(`content/projects/${project.folder}/content.html`);
        
        if (response.ok) {
            const content = await response.text();
            section.innerHTML = content;
            // Execute any scripts in the loaded content
            executeScripts(section);
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
    
    // Close mobile menu when a tab is selected
    if (isMobile() && mobileMenuOpen) {
        toggleMobileMenu();
    }
    
    if (tabId === 'projects') {
        // Show projects section when projects tab is clicked
        const projectsSection = document.getElementById('projects');
        if (projectsSection) projectsSection.style.display = 'block';
        toggleProjectSidebar(true);
    } else {
        const target = document.getElementById(tabId);
        if (target) {
            target.style.display = 'block';
            
            // Load project content if it's a project section
            if (target.classList.contains('project-section')) {
                loadProjectContent(tabId);
            }
        }
        
        // Hide project sidebar if not on projects or a specific project
        if (!projects.some(p => p.id === tabId)) {
            toggleProjectSidebar(false);
        }
    }
    
    // Scroll to top on mobile when changing tabs
    if (isMobile()) {
        window.scrollTo(0, 0);
    }
}

function toggleProjectSidebar(show) {
    const sidebar = document.getElementById('project-sidebar');
    if (show !== undefined) {
        projectSidebarVisible = show;
    } else {
        projectSidebarVisible = !projectSidebarVisible;
    }
    
    // On mobile, handle project sidebar differently
    if (isMobile()) {
        if (projectSidebarVisible) {
            sidebar.classList.add('show');
            // Replace main menu with project menu
            document.getElementById('sidebar').classList.remove('show');
        } else {
            sidebar.classList.remove('show');
        }
    } else {
        sidebar.classList.toggle('show', projectSidebarVisible);
    }
}

function attachProjectLinkHandlers() {
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tab = link.getAttribute('href').substring(1);
            showTab(tab);
            
            // On mobile, close the project sidebar after selection
            if (isMobile()) {
                setTimeout(() => {
                    toggleProjectSidebar(false);
                }, 300);
            }
        });
    });
}

// Handle window resize
function handleResize() {
    // Close mobile menu if window becomes larger
    if (!isMobile() && mobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Reset sidebars on desktop
    if (!isMobile()) {
        document.getElementById('sidebar').classList.remove('show');
        document.getElementById('project-sidebar').classList.remove('show');
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
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    menuOverlay.addEventListener('click', toggleMobileMenu);
    
    // Main navigation handlers
    document.querySelectorAll('#sidebar nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tab = link.getAttribute('href').substring(1);
            showTab(tab);
        });
    });
    
    // Project sidebar mouse leave handler (desktop only)
    const projectSidebar = document.getElementById('project-sidebar');
    projectSidebar.addEventListener('mouseleave', () => {
        if (!isMobile()) {
            projectSidebarVisible = false;
            projectSidebar.classList.remove('show');
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});