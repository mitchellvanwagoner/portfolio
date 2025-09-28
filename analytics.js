// Enhanced Analytics Tracking
// This script adds custom event tracking for better visitor insights

// Track scroll depth
let maxScroll = 0;
let scrollTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

function trackScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
    }

    // Track milestone scroll depths
    Object.keys(scrollTracked).forEach(depth => {
        if (scrollPercent >= depth && !scrollTracked[depth]) {
            scrollTracked[depth] = true;
            gtag('event', 'scroll_depth', {
                event_category: 'engagement',
                event_label: `${depth}%`,
                value: parseInt(depth)
            });
        }
    });
}

// Track time on page
let pageStartTime = Date.now();
let timeOnPageTracked = {
    30: false,  // 30 seconds
    60: false,  // 1 minute
    120: false, // 2 minutes
    300: false  // 5 minutes
};

function trackTimeOnPage() {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);

    Object.keys(timeOnPageTracked).forEach(seconds => {
        if (timeOnPage >= seconds && !timeOnPageTracked[seconds]) {
            timeOnPageTracked[seconds] = true;
            gtag('event', 'time_on_page', {
                event_category: 'engagement',
                event_label: `${seconds}s`,
                value: parseInt(seconds)
            });
        }
    });
}

// Track navigation clicks
function trackNavigation(section) {
    gtag('event', 'navigation_click', {
        event_category: 'navigation',
        event_label: section,
        page_title: document.title
    });
}

// Track project clicks
function trackProjectClick(projectName) {
    gtag('event', 'project_view', {
        event_category: 'projects',
        event_label: projectName,
        page_title: document.title
    });
}

// Track external link clicks
function trackExternalLink(url, linkText) {
    gtag('event', 'external_link_click', {
        event_category: 'outbound',
        event_label: url,
        transport_type: 'beacon'
    });
}

// Track download clicks
function trackDownload(fileName) {
    gtag('event', 'file_download', {
        event_category: 'downloads',
        event_label: fileName
    });
}

// Initialize tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up scroll tracking
    window.addEventListener('scroll', trackScrollDepth);

    // Set up time tracking (check every 10 seconds)
    setInterval(trackTimeOnPage, 10000);

    // Track navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.getAttribute('href').replace('#', '');
            trackNavigation(section);
        });
    });

    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            trackExternalLink(this.href, this.textContent);
        });
    });

    // Track download links
    document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"], a[href$=".docx"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.href.split('/').pop();
            trackDownload(fileName);
        });
    });
});

// Track when user leaves page
window.addEventListener('beforeunload', function() {
    const finalTimeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    gtag('event', 'page_exit', {
        event_category: 'engagement',
        event_label: 'time_on_page',
        value: finalTimeOnPage,
        custom_parameters: {
            max_scroll_depth: maxScroll
        }
    });
});