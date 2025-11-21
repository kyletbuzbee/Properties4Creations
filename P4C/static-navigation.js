/**
 * P4C Static Navigation
 * Client-side routing and page transitions for static HTML version
 * Handles navigation between pages within the same domain
 */

P4C.Navigation = {
    currentPage: null,
    pageCache: new Map(),

    // Initialize navigation functionality
    init: function() {
        console.log('🧭 Initializing P4C Navigation...');

        // Detect current page
        this.currentPage = this.getCurrentPage();

        // Bind navigation events
        this.bindNavigationEvents();

        // Setup page transitions
        this.setupPageTransitions();

        console.log('✅ P4C Navigation initialized');
    },

    // Get current page from URL
    getCurrentPage: function() {
        const path = window.location.pathname;
        return path === '/' ? 'index.html' : path.replace('/', '') + '.html';
    },

    // Bind navigation event handlers
    bindNavigationEvents: function() {
        // Intercept internal links
        document.addEventListener('click', this.handleLinkClick.bind(this));

        // Handle browser navigation (back/forward buttons)
        window.addEventListener('popstate', this.handlePopState.bind(this));

        // Handle programmatic navigation
        window.addEventListener('p4c-navigate', this.handleNavigationEvent.bind(this));
    },

    // Handle link clicks
    handleLinkClick: function(e) {
        const link = e.target.closest('a[href]');

        if (link && this.shouldInterceptLink(link)) {
            e.preventDefault();
            const url = new URL(link.href);

            // Check if it's an internal P4C page
            if (this.isInternalPage(url)) {
                this.navigateTo(url.pathname);
            } else {
                // External link - open in new tab
                window.open(url.href, '_blank');
            }
        }
    },

    // Check if link should be intercepted for client-side navigation
    shouldInterceptLink: function(link) {
        const href = link.getAttribute('href');

        // Don't intercept external links, anchors, or links with special attributes
        if (href.startsWith('http') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('#') ||
            link.hasAttribute('download') ||
            link.getAttribute('target') === '_blank') {
            return false;
        }

        // Only intercept links to HTML files
        return href.endsWith('.html') || href === '/' || !href.includes('.');
    },

    // Check if URL is an internal P4C page
    isInternalPage: function(url) {
        // Check if it's the same origin
        if (url.origin !== window.location.origin) {
            return false;
        }

        // Check if it's one of our static pages
        const path = url.pathname;
        return path === '/' ||
               path.endsWith('.html') ||
               path.includes('/projects/') ||
               path.includes('/resources/') ||
               path.includes('/insights/');
    },

    // Handle browser back/forward navigation
    handlePopState: function(e) {
        const newUrl = new URL(window.location.href);
        this.navigateTo(newUrl.pathname, false); // Don't push to history
    },

    // Handle programmatic navigation events
    handleNavigationEvent: function(e) {
        const { path, replace } = e.detail;
        this.navigateTo(path, !replace);
    },

    // Navigate to a new page
    navigateTo: function(path, updateHistory = true) {
        // Normalize path
        path = path === '/' ? '/index.html' : path;
        if (!path.endsWith('.html')) {
            path = path + '.html';
        }

        console.log(`🧭 Navigating to: ${path}`);

        // Don't navigate if already on the same page
        if (this.currentPage === path.replace('/', '')) {
            return;
        }

        // Show loading state
        this.showPageLoading(true);

        this.loadPage(path)
            .then(html => {
                return this.replacePageContent(html, path);
            })
            .then(() => {
                // Update browser history
                if (updateHistory) {
                    const fullUrl = window.location.origin + path;
                    history.pushState({ path: path }, '', fullUrl);
                }

                // Update current page
                this.currentPage = path.replace('/', '');

                // Update page title and meta
                this.updatePageMeta();

                // Re-initialize page-specific features
                this.reinitializePageFeatures();

                console.log(`✅ Navigation complete: ${path}`);
            })
            .catch(error => {
                console.error('❌ Navigation failed:', error);
                this.showPageError(error);
            })
            .finally(() => {
                this.showPageLoading(false);
            });
    },

    // Load page content
    loadPage: function(path) {
        return new Promise((resolve, reject) => {
            // Check cache first
            if (this.pageCache.has(path)) {
                console.log(`📄 Page loaded from cache: ${path}`);
                resolve(this.pageCache.get(path));
                return;
            }

            // Shoot request
            fetch(path)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(html => {
                    // Cache the page for future use
                    this.pageCache.set(path, html);
                    console.log(`📄 Page loaded from network: ${path}`);
                    resolve(html);
                })
                .catch(error => {
                    console.error('Failed to load page:', path, error);
                    reject(error);
                });
        });
    },

    // Replace page content
    replacePageContent: function(html, path) {
        return new Promise((resolve) => {
            // Extract content from loaded HTML
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');

            // Extract main content
            const newMain = newDoc.querySelector('main');
            const currentMain = document.querySelector('main');

            if (newMain && currentMain) {
                // Replace main content
                this.fadeTransition(currentMain, newMain, () => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    },

    // Smooth fade transition between content
    fadeTransition: function(oldElement, newElement, callback) {
        // Fade out current content
        oldElement.style.opacity = '0';
        oldElement.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            // Replace content
            oldElement.innerHTML = newElement.innerHTML;

            // Update element attributes (data-page, etc.)
            Object.values(newElement.attributes).forEach(attr => {
                oldElement.setAttribute(attr.name, attr.value);
            });

            // Fade back in
            oldElement.style.opacity = '1';

            setTimeout(callback, 300);
        }, 300);
    },

    // Setup page transition effects
    setupPageTransitions: function() {
        // Add CSS for smooth transitions if not present
        if (!document.getElementById('p4c-page-transitions')) {
            const style = document.createElement('style');
            style.id = 'p4c-page-transitions';
            style.textContent = `
                .p4c-page-loading main {
                    opacity: 0.6;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }

                .p4c-page-loading .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .p4c-page-error {
                    text-align: center;
                    padding: 2rem;
                    color: #dc2626;
                }
            `;
            document.head.appendChild(style);
        }
    },

    // Show page loading state
    showPageLoading: function(show) {
        if (show) {
            document.body.classList.add('p4c-page-loading');

            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.id = 'p4c-loading-overlay';
            overlay.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span>Loading page...</span>
                </div>
            `;

            document.body.appendChild(overlay);
        } else {
            document.body.classList.remove('p4c-page-loading');

            const overlay = document.getElementById('p4c-loading-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    },

    // Show page error
    showPageError: function(error) {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `
                <div class="p4c-page-error">
                    <div class="w-16 h-16 mx-auto mb-4 text-red-500">
                        <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold mb-2">Page Not Found</h2>
                    <p class="mb-4">${error.message}</p>
                    <button onclick="P4C.Navigation.navigateTo('/')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go Home
                    </button>
                </div>
            `;
        }
    },

    // Update page title and meta tags
    updatePageMeta: function() {
        // Update title
        const title = document.title;
        if (title) {
            document.title = title;
            // Could sync with browser history state title
        }

        // Update any other meta tags if needed
        // For now, the static HTML files handle their own meta tags
    },

    // Re-initialize page-specific features after navigation
    reinitializePageFeatures: function() {
        // Re-initialize maps if needed
        const mapContainers = document.querySelectorAll('.property-map');
        if (P4C.Maps && mapContainers.length > 0) {
            P4C.Maps.bindMapEvents();
        }

        // Re-initialize forms
        if (P4C.Forms) {
            P4C.Forms.bindFormEvents();
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Trigger page load event
        const pageLoadEvent = new CustomEvent('p4c-page-loaded', {
            detail: { page: this.currentPage }
        });
        document.dispatchEvent(pageLoadEvent);
    },

    // Get current page state
    getCurrentState: function() {
        return {
            page: this.currentPage,
            url: window.location.href,
            title: document.title
        };
    },

    // Force refresh of page cache
    invalidateCache: function() {
        this.pageCache.clear();
        console.log('🗑️ Page cache cleared');
    },

    // Prefetch pages for faster navigation
    prefetchPage: function(path) {
        if (!this.pageCache.has(path)) {
            this.loadPage(path).then(() => {
                console.log(`⏱️ Page prefetched: ${path}`);
            }).catch(() => {
                // Silent fail for prefetching
            });
        }
    },

    // Navigate to home
    goHome: function() {
        this.navigateTo('/');
    },

    // Go back in history
    goBack: function() {
        window.history.back();
    },

    // Go forward in history
    goForward: function() {
        window.history.forward();
    },

    // Check if navigation is possible
    canGoBack: function() {
        return window.history.length > 1;
    }
};
