/**
 * Search Index Builder for Calcify
 * Uses lunr.js to client-side index the calculators.js array.
 * As defined in PROJECT_MASTER.md Section 9 and 22.
 */

let searchIndex;

document.addEventListener('DOMContentLoaded', () => {
    // Check if the registry array and Lunr library exist in the global scope
    if (typeof lunr !== 'undefined' && typeof window.calcRegistry !== 'undefined') {

        // Build the Lunr search index
        searchIndex = lunr(function () {
            this.ref('id');
            // Give higher weight to name matching
            this.field('name', { boost: 10 });
            this.field('description', { boost: 5 });
            this.field('category');
            this.field('tags', { boost: 5 });

            // Feed all calculators from the registry into the index
            window.calcRegistry.forEach(function (doc) {
                this.add({
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                    category: doc.category,
                    tags: doc.tags.join(' ')
                });
            }, this);
        });

        // Link to the search bar if present on the page (e.g. on the homepage)
        const searchInput = document.getElementById('global-search');
        const gridToFilter = document.getElementById('featured-grid'); // Replace/append depending on usage

        // Ensure debounce from utils.js is available
        const debounceFn = typeof debounce === 'function' ? debounce : (fn, d) => {
            let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), d); };
        };

        if (searchInput) {
            searchInput.addEventListener('input', debounceFn((e) => {
                const query = e.target.value.trim();

                if (query === '') {
                    // Reset UI: Display featured calculators from standard registry logic
                    // This is a placeholder for where the UI reset function will be called.
                    console.log("Search cleared, show default grid.");
                    return;
                }

                // Execute search
                const results = searchIndex.search(query);

                // Results return matches with { ref: 'bmi-calculator', score: ... }
                // Here is where you will dynamically build HTML cards bridging the `ref` to the master registry records.
                console.log("Search Results Output:", results);
            }, 300));
        }
    } else {
        console.warn("Lunr.js or Calculator Registry not found. Search is disabled.");
    }
});
