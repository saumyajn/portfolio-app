import { useState, useEffect, useRef } from 'react';

export default function usePython() {
    const [isReady, setIsReady] = useState(false);
    const pyodideRef = useRef(null);

    useEffect(() => {
        const initPyodide = async () => {
            // 1. Check if Pyodide is already loaded
            if (pyodideRef.current) return;

            try {
                // 2. Wait for the window.loadPyodide function (from the script tag)
                // Sometimes the script tag takes a second to load, so we check for it.
                if (window.loadPyodide) {
                    pyodideRef.current = await window.loadPyodide();
                    setIsReady(true);
                } else {
                    console.error("Pyodide script not found in index.html");
                }
            } catch (error) {
                console.error("Error loading Pyodide:", error);
            }
        };

        // Retry mechanism in case the script tag loads slowly
        const interval = setInterval(() => {
            if (window.loadPyodide && !isReady) {
                initPyodide();
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isReady]);

    const runScript = async (script, inputs = {}) => {
        if (!pyodideRef.current) throw new Error("Python is not ready yet");

        try {
            // 1. Convert JS inputs to Python variables
            for (const [key, value] of Object.entries(inputs)) {
                // We map values to global variables in the Python environment
                pyodideRef.current.globals.set(key, value);
            }

            // 2. Capture standard output (print statements)
            let output = [];
            pyodideRef.current.setStdout({ batched: (msg) => output.push(msg) });

            // 3. Run the code
            await pyodideRef.current.runPythonAsync(script);

            // 4. Return the joined output
            return output.join('\n');
            
        } catch (err) {
            throw new Error(err.message);
        }
    };

    return { isReady, runScript };
}