// This list defines the tabs in your dashboard
export const APPS_CONFIG = [
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
    // {
    //     id: 'password-gen',
    //     title: 'Pass Generator',
    //     description: 'Generates a secure random password using Python secrets.',
    //     scriptPath: '/python/password_gen.py',
    //     inputs: [
    //         { name: 'length', label: 'Length', type: 'number', defaultValue: 12 },
    //         { name: 'include_special', label: 'Include Special Chars? (1=Yes, 0=No)', type: 'number', defaultValue: 1 }
    //     ]
    // },
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