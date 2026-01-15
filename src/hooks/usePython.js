import { useState, useEffect, useRef, useCallback } from 'react';

export default function usePython() {
    const [isReady, setIsReady] = useState(false);
    const workerRef = useRef(null);

    useEffect(() => {
  
        const workerPath = `${process.env.PUBLIC_URL}/pyodideWorker.js`;
        
        workerRef.current = new Worker(workerPath);

        setIsReady(true);

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);

    const runScript = useCallback((script, inputs = {}) => {
        return new Promise((resolve, reject) => {
            if (!workerRef.current) {
                reject(new Error("Worker not initialized"));
                return;
            }

            const id = Math.random().toString(36).substring(7);

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

            workerRef.current.postMessage({
                id,
                python: script,
                inputs
            });
        });
    }, []);

    return { isReady, runScript };
}