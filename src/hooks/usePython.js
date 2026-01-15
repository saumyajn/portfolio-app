import { useState, useEffect, useRef, useCallback } from 'react';

export default function usePython() {
    const [isReady, setIsReady] = useState(false);
    const workerRef = useRef(null);

    useEffect(() => {
        // 1. Initialize the Worker
      const workerPath = `${process.env.PUBLIC_URL}/pyodideWorker.js`;

        workerRef.current = new Worker(workerPath);

        // 2. We assume the worker is "ready" quickly, 
        // but real execution waits for the internal promise in the worker.
        setIsReady(true);

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    const runScript = useCallback((script, inputs = {}) => {
        return new Promise((resolve, reject) => {
            const id = Math.random().toString(36).substring(7);

            // Create a one-time event listener for the result
            const handleMessage = (event) => {
                if (event.data.id === id) {
                    workerRef.current.removeEventListener('message', handleMessage);
                    if (event.data.error) {
                        reject(new Error(event.data.error));
                    } else {
                        resolve(event.data.results);
                    }
                }
            };

            workerRef.current.addEventListener('message', handleMessage);

            // Send data to the worker
            workerRef.current.postMessage({
                id,
                python: script,
                inputs
            });
        });
    }, []);

    return { isReady, runScript };
}