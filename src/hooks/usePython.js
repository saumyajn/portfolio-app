import { useState, useEffect, useRef } from 'react';

export default function usePython() {
    const [isReady, setIsReady] = useState(false);
    const pyodideRef = useRef(null);
    const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";

    useEffect(() => {
        const initPyodide = async () => {
            // 1. Check if Pyodide is already initialized in this hook
            if (pyodideRef.current) return;

            // 2. Check if the script tag already exists in the DOM
            let script = document.querySelector(`script[src="${PYODIDE_URL}"]`);

            if (!script) {
                // 3. If not, inject it dynamically
                script = document.createElement('script');
                script.src = PYODIDE_URL;
                script.async = true;
                document.body.appendChild(script);
            }

            // 4. Set up the load handler (runs when script finishes downloading)
            script.onload = async () => {
                if (!window.loadPyodide) return;
                try {
                    pyodideRef.current = await window.loadPyodide();
                    setIsReady(true);
                } catch (err) {
                    console.error("Pyodide failed to load:", err);
                }
            };

            // 5. Fallback: If script was already loaded by another component or cache
            if (window.loadPyodide && !pyodideRef.current) {
                pyodideRef.current = await window.loadPyodide();
                setIsReady(true);
            }
        };

        // RUN IT IMMEDIATELY
        initPyodide();

    }, []); // 👈 Keep dependency array empty so it only runs once on mount

    const runScript = async (script, inputs = {}) => {
        if (!pyodideRef.current) throw new Error("Python is not ready yet");

        try {
            // 1. Convert JS inputs to Python variables
            for (const [key, value] of Object.entries(inputs)) {
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