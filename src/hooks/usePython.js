import { useState, useEffect, useCallback } from 'react';

export default function usePython() {
  const [isReady, setIsReady] = useState(false);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Portfolio uses Create React App, so we MUST use PUBLIC_URL
    const pyWorker = new Worker(process.env.PUBLIC_URL + '/pyodideWorker.js');
    
    pyWorker.onmessage = (event) => {
      if (event.data.type === 'ready') {
        setIsReady(true);
      }
    };
    
    setWorker(pyWorker);
    return () => pyWorker.terminate();
  }, []);

  const runScript = useCallback((code, inputs = {}) => {
    return new Promise((resolve, reject) => {
      if (!worker) return reject("Worker not initialized");
      
      const id = Date.now().toString();
      const handleMessage = (event) => {
        if (event.data.id === id) {
          worker.removeEventListener('message', handleMessage);
          if (event.data.type === 'result') resolve(event.data.result);
          else if (event.data.type === 'error') reject(new Error(event.data.error));
        }
      };
      
      worker.addEventListener('message', handleMessage);
      
      // Pass the code and the UI inputs to the worker
      worker.postMessage({ code, inputs, id });
    });
  }, [worker]);

  return { isReady, runScript };
}