/**
 * Shared Utility Functions for Calcify
 * As defined in PROJECT_MASTER.md Section 15
 */

/**
 * Formats a number as a USD currency string with 2 decimal places and commas.
 * Example: 1234.5 -> "$1,234.50"
 * @param {number} number - The number to format.
 * @returns {string} The formatted USD currency string.
 */
function formatCurrency(number) {
    if (isNaN(number)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

/**
 * Formats a number with commas and a specified number of decimal places.
 * Example: 1234.5678, 2 -> "1,234.57"
 * @param {number} number - The number to format.
 * @param {number} [decimals=2] - The number of decimal places to include.
 * @returns {string} The formatted number string.
 */
function formatNumber(number, decimals = 2) {
    if (isNaN(number)) return '0';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(number);
}

/**
 * Validates if the input value is a finite number and within the provided [min, max] range.
 * @param {number|string} value - The input value to validate.
 * @param {number} [min=-Infinity] - The minimum allowed value.
 * @param {number} [max=Infinity] - The maximum allowed value.
 * @returns {boolean} True if valid, false if empty, NaN, or out-of-range.
 */
function validateInput(value, min = -Infinity, max = Infinity) {
    if (value === null || value === undefined || value === '') return false;
    const num = Number(value);
    if (!isFinite(num)) return false;
    if (num < min || num > max) return false;
    return true;
}

/**
 * Displays a styled inline error message in the specified element.
 * Adds the '.error-visible' class to make it block visible.
 * @param {string} elementId - The DOM ID of the error message element.
 * @param {string} message - The error message to display.
 */
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('error-visible');
    }
}

/**
 * Clears and hides the error message in the specified element.
 * Removes the '.error-visible' class.
 * @param {string} elementId - The DOM ID of the error message element.
 */
function hideError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('error-visible');
    }
}

/**
 * Returns a debounced version of a function that delays execution 
 * until after the specified delay has elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=300] - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
