/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// Load Pyodide from the CDN (or local public folder if you prefer)
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");

let pyodideReadyPromise;

async function load() {
  self.pyodide = await loadPyodide();
  self.postMessage({ type: 'ready' });
}

pyodideReadyPromise = load();

self.onmessage = async (event) => {
  // We extract the 'inputs' sent from your React TextFields
  const { id, code, inputs } = event.data;
  await pyodideReadyPromise;
  
  try {
    let output = "";
    
    // 1. Intercept standard output so ONLY print() statements are returned
    self.pyodide.setStdout({ batched: (msg) => { output += msg + "\n"; } });
    self.pyodide.setStderr({ batched: (msg) => { output += msg + "\n"; } });

    // 2. Inject React inputs into Python globals!
    // This allows bill_splitter.py to instantly read the 'total_bill' and 'people' variables
    if (inputs && typeof inputs === 'object') {
        for (const [key, value] of Object.entries(inputs)) {
            // Convert numeric strings into actual Numbers so Python math works
            const parsedValue = isNaN(Number(value)) || value === "" ? value : Number(value);
            self.pyodide.globals.set(key, parsedValue);
        }
    }

    // 3. Run the python script
    await self.pyodide.runPythonAsync(code);
    
    // 4. Send ONLY the intercepted print statements back to React
    self.postMessage({ 
        type: 'result', 
        result: output || "Script executed successfully with no printed output.", 
        id 
    });

  } catch (err) {
    self.postMessage({ type: 'error', error: err.message, id });
  }
};