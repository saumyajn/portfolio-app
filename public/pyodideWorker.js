/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// Load Pyodide from the CDN (or local public folder if you prefer)
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");

let pyodide = null;

async function loadEngine() {
  pyodide = await loadPyodide();
}

let pyodideReadyPromise = loadEngine();

self.onmessage = async (event) => {
  const { id, python, inputs } = event.data;

  try {
    await pyodideReadyPromise;

    // 1. Pass inputs to Python
    if (inputs) {
      for (const key of Object.keys(inputs)) {
        pyodide.globals.set(key, inputs[key]);
      }
    }

    // 2. Capture output
    let output = [];
    pyodide.setStdout({ batched: (msg) => output.push(msg) });

    // 3. Run Code
    await pyodide.runPythonAsync(python);

    // 4. Send result back
    self.postMessage({ id, results: output.join('\n'), error: null });

  } catch (error) {
    self.postMessage({ id, results: null, error: error.message });
  }
};