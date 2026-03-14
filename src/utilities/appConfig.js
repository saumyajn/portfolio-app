// This list defines the tabs in your dashboard
export const APPS_CONFIG = [
    {
        id: 'complexity-analyzer',
        title: 'Big-O Code Analyzer',
        description: 'Paste your Python script in the Monaco Editor below and hit Run to analyze its Time Complexity.',
        scriptPath: '/complexity_analyzer.py', // Make sure this matches the file in public/
        inputs: [
            // This triggers the blank Monaco Editor!
            { name: 'user_code', label: 'Paste Code to Analyze', type: 'code', defaultValue: 'def example_function(arr):\n    for i in arr:\n        for j in arr:\n            print(i, j)' }
        ]
    },
    {
        id: 'bill-splitter',
        title: 'Bill Splitter',
        description: 'Calculates cost per person including tip.',
        scriptPath: '/python/bill_splitter.py', // Must exist in public/python/
        inputs: [
            { name: 'total_bill', label: 'Total Bill ($)', type: 'number', defaultValue: 100 },
            { name: 'people', label: 'Number of People', type: 'number', defaultValue: 2 },
            { name: 'tip', label: 'Tip Percentage (%)', type: 'number', defaultValue: 15 }
        ]
    },
    {
        id: 'password-gen',
        title: 'PyPassword Generator',
        description: 'Generates a secure random password using randomization.',
        scriptPath: '/python/password_generator.py',
        inputs: [
            { name: 'letters', label: 'How many letters?', type: 'number', defaultValue: 5 },
            { name: 'symbols', label: 'How many symbols?', type: 'number', defaultValue: 4 },
            { name: 'numbers', label: 'How many numbers?', type: 'number', defaultValue: 3 }
        ]
    },
    {
        id: 'bmi-calc',
        title: 'BMI Calculator',
        description: 'Calculate Body Mass Index from height and weight.',
        modes: [
            {
                id: 'metric',
                label: 'Metric (kg/cm)',
                scriptPath: '/python/bmi_metric.py',
                inputs: [
                    { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70 },
                    { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175 }
                ]
            },
            {
                id: 'standard',
                label: 'Standard (lb/in)',
                scriptPath: '/python/bmi_standard.py',
                inputs: [
                    { name: 'weight', label: 'Weight (lbs)', type: 'number', defaultValue: 150 },
                    { name: 'height_ft', label: 'Height (feet)', type: 'number', defaultValue: 5 },
                    { name: 'height_in', label: 'Height (inches)', type: 'number', defaultValue: 9 }
                ]
            }

        ]

    }
];