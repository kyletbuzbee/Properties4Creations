/**
 * P4C Static Search
 * Client-side search functionality that mimics Next.js GlobalSearch component
 * Provides real-time search with keyboard navigation and filtering
 */

P4C.Search = {
    searchData: [],
    searchInput: null,
    resultsContainer: null,
    debounceTimer: null,
    currentQuery: '',
    selectedIndex: -1,

    // Initialize search functionality
    init: function() {
        console.log('🔍 Initializing P4C Search...');

        // Load search data
        this.loadSearchData();

        // Get DOM elements
        this.searchInput = document.getElementById('search-input');
        this.resultsContainer = document.getElementById('search-results');

        // Bind event handlers
        this.bindEvents();

        console.log('✅ P4C Search initialized');
    },

    // Load search data (could be embedded in HTML or loaded via AJAX)
    loadSearchData: function() {
        // Static search data - in a real implementation, this could be loaded from JSON
        this.searchData = [
            // Projects
            {
                id: '1',
                title: 'Downtown Austin Renovation',
                type: 'project',
                url: 'projects/downtown-austin-renovation.html',
                description: 'Modern 2BR apartment in downtown Austin',
                tags: ['Section 8', 'Veteran Priority'],
                location: 'Downtown Austin',
                price: '$1,200/month'
            },
            {
                id: '2',
                title: 'South Congress Lofts',
                type: 'project',
                url: 'projects/south-congress-lofts.html',
                description: 'Historic building converted to modern lofts',
                tags: ['Market Rate', 'Pet Friendly'],
                location: 'South Congress',
                price: '$1,800/month'
            },
            {
                id: '3',
                title: 'Riverside Gardens',
                type: 'project',
                url: 'projects/riverside-gardens.html',
                description: 'Beautiful garden-style apartments near Lady Bird Lake',
                tags: ['Section 8', 'Waterfront'],
                location: 'Downtown Austin',
                price: '$950/month'
            },
            // Resources
            {
                id: '4',
                title: 'Section 8 Voucher Guide',
                type: 'resource',
                url: 'resources/section8.html',
                description: 'Complete guide to Section 8 housing vouchers'
            },
            {
                id: '5',
                title: 'Fair Market Rent Calculator',
                type: 'resource',
                url: 'resources/voucher-calculator.html',
                description: 'Calculate your potential housing assistance'
            },
            {
                id: '6',
                title: 'Veteran Housing Benefits',
                type: 'resource',
                url: 'resources/veteran-benefits.html',
                description: 'Special housing programs for veterans'
            },
            // Pages
            {
                id: '7',
                title: 'About Properties 4 Creation',
                type: 'page',
                url: 'about.html',
                description: 'Our mission and values'
            },
            {
                id: '8',
                title: 'Contact Us',
                type: 'page',
                url: 'contact.html',
                description: 'Get in touch with our team'
            },
            {
                id: '9',
                title: 'Fair Cash Offers',
                type: 'page',
                url: 'get-started.html',
                description: 'How we value your property'
            },
            {
                id: '10',
                title: 'Housing Market Insights',
                type: 'page',
                url: 'insights.html',
                description: 'Latest real estate trends and analysis'
            }
        ];
    },

    // Bind event handlers
    bindEvents: function() {
        // Search input events
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.onInput.bind(this));
            this.searchInput.addEventListener('keydown', this.onKeydown.bind(this));
        }

        // Search toggle button
        const searchToggle = document.getElementById('search-toggle');
        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                P4C.Modals.toggle('search');
            });
        }

        // Search close button
        const searchClose = document.getElementById('search-close');
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                P4C.Modals.close('search');
            });
        }
    },

    // Handle search input
    onInput: function(event) {
        const query = event.target.value.trim();
        this.currentQuery = query;

        // Clear previous timeout
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        // Debounce search
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, P4C.config.searchConfig.debounceMs);
    },

    // Handle keyboard navigation
    onKeydown: function(event) {
        const results = this.resultsContainer ? this.resultsContainer.children : [];
        if (results.length === 0) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
                this.updateSelection();
                this.scrollToSelected();
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                this.scrollToSelected();
                break;

            case 'Enter':
                event.preventDefault();
                if (this.selectedIndex >= 0) {
                    const selectedLink = results[this.selectedIndex].querySelector('a');
                    if (selectedLink) {
                        P4C.Modals.close('search');
                        window.location.href = selectedLink.href;
                    }
                }
                break;

            case 'Escape':
                event.preventDefault();
                P4C.Modals.close('search');
                break;
        }
    },

    // Update visual selection
    updateSelection: function() {
        const results = this.resultsContainer ? this.resultsContainer.children : [];

        // Remove previous selection
        Array.from(results).forEach(result => {
            result.classList.remove('selected');
        });

        // Add current selection
        if (this.selectedIndex >= 0 && results[this.selectedIndex]) {
            results[this.selectedIndex].classList.add('selected');
        }
    },

    // Scroll selected item into view
    scrollToSelected: function() {
        if (!this.resultsContainer || this.selectedIndex < 0) return;

        const selectedItem = this.resultsContainer.children[this.selectedIndex];
        if (selectedItem) {
            selectedItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    },

    // Perform search
    performSearch: function(query) {
        if (!query.trim()) {
            this.showEmptyState();
            return;
        }

        // Filter results
        const results = this.searchData.filter(item => {
            const searchTerm = query.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchTerm) ||
                item.description?.toLowerCase().includes(searchTerm) ||
                item.location?.toLowerCase().includes(searchTerm) ||
                item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });

        // Sort by relevance
        results.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase());
            const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase());

            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;

            return 0;
        });

        // Limit to max results
        const limitedResults = results.slice(0, P4C.config.searchConfig.maxResults);

        this.displayResults(limitedResults);
    },

    // Display search results
    displayResults: function(results) {
        if (!this.resultsContainer) return;

        this.resultsContainer.innerHTML = '';

        if (results.length === 0) {
            this.showNoResults();
            return;
        }

        results.forEach((result, index) => {
            const resultElement = this.createResultElement(result, index);
            this.resultsContainer.appendChild(resultElement);
        });
    },

    // Create individual result element
    createResultElement: function(result, index) {
        const element = document.createElement('div');
        element.className = 'p-4 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors';
        element.setAttribute('data-index', index);

        element.innerHTML = `
            <a href="${result.url}" class="flex items-start gap-3 block group" onclick="P4C.Modals.close('search')">
                ${this.getTypeIcon(result.type)}
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-semibold text-brand-navy truncate">${result.title}</h3>
                        <span class="text-xs text-slate-400 ml-2 flex-shrink-0">${this.getTypeLabel(result.type)}</span>
                    </div>
                    <p class="text-sm text-slate-600 mt-1 line-clamp-2">${result.description}</p>
                    ${this.createMetadata(result)}
                    ${this.createTags(result)}
                </div>
            </a>
        `;

        return element;
    },

    // Get icon for result type
    getTypeIcon: function(type) {
        const icons = {
            project: `<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>`,
            resource: `<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>`,
            page: `<svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>`
        };
        return icons[type] || icons.page;
    },

    // Get human-readable type label
    getTypeLabel: function(type) {
        const labels = {
            project: 'Project',
            resource: 'Resource',
            page: 'Page'
        };
        return labels[type] || 'Unknown';
    },

    // Create metadata section
    createMetadata: function(result) {
        if (!result.location && !result.price) return '';

        let metadata = '<div class="flex items-center gap-4 mt-2">';

        if (result.location) {
            metadata += `
                <div class="flex items-center gap-1 text-xs text-slate-500">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ${result.location}
                </div>
            `;
        }

        if (result.price) {
            metadata += `<div class="text-xs font-medium text-brand-navy">${result.price}</div>`;
        }

        metadata += '</div>';
        return metadata;
    },

    // Create tags section
    createTags: function(result) {
        if (!result.tags || result.tags.length === 0) return '';

        const tags = result.tags.slice(0, 3);
        let tagsHtml = '<div class="flex gap-1 mt-2">';

        tags.forEach(tag => {
            tagsHtml += `<span class="inline-block px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">${tag}</span>`;
        });

        if (result.tags.length > 3) {
            tagsHtml += `<span class="text-xs text-slate-400">+${result.tags.length - 3} more</span>`;
        }

        tagsHtml += '</div>';
        return tagsHtml;
    },

    // Show empty state
    showEmptyState: function() {
        if (!this.resultsContainer) return;

        this.resultsContainer.innerHTML = `
            <div class="p-8 text-center">
                <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 class="text-lg font-medium text-slate-600 mb-2">Start typing to search</h3>
                <p class="text-slate-500">Search for properties, housing resources, and site pages</p>
            </div>
        `;
    },

    // Show no results
    showNoResults: function() {
        if (!this.resultsContainer) return;

        this.resultsContainer.innerHTML = `
            <div class="p-8 text-center">
                <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 class="text-lg font-medium text-slate-600 mb-2">No results found</h3>
                <p class="text-slate-500">
                    Try adjusting your search terms or browse our <a href="projects.html" class="text-brand-navy hover:underline">projects</a>
                    and <a href="resources.html" class="text-brand-navy hover:underline">resources</a>.
                </p>
            </div>
        `;
    },

    // Clear search
    clear: function() {
        this.currentQuery = '';
        this.selectedIndex = -1;
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.showEmptyState();
    }
            this.searchInput.value = '';
        }
        this.showEmptyState();
    }
};
