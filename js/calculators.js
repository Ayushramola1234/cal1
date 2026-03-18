/**
 * Master Calculator Registry for Calcify
 * As defined in PROJECT_MASTER.md Section 8 and 9
 * 
 * Every calculator must have an entry here BEFORE any code is written.
 */

const calculators = [
    {
        id: "bmi-calculator",
        name: "BMI Calculator",
        category: "health",
        slug: "bmi-calculator",
        url: "/pages/health/bmi-calculator.html", // simple: .html
        description: "Calculate your Body Mass Index to assess if your weight is healthy.",
        tags: ["bmi", "body mass index", "weight", "health"],
        icon: "fa-weight-scale",
        featured: true,
        dateAdded: "2025-03-01",
        complexity: "simple",
        hasChart: false,
        chartType: null,
        fileType: "single",
        related: ["bmr-calculator", "calorie-calculator", "ideal-weight-calculator"]
    }
];

// If using ES6 modules, export it:
// export default calculators;
