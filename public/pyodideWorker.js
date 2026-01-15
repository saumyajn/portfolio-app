/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");

let pyodide = null;

async function loadPyodideEngine() {
  // loadPyodide is a global function injected by the importScripts line above
  pyodide = await loadPyodide();
}

let pyodideReadyPromise = loadPyodideEngine();

self.onmessage = async (event) => {
  const { id, python, inputs } = event.data;

  // Wait for the engine to initialize
  await pyodideReadyPromise;

  try {
    // 1. Load inputs into Python global scope
    // We map the JS inputs (e.g. {name: "Saumya"}) to Python variables
    if (inputs) {
        for (const key of Object.keys(inputs)) {
            pyodide.globals.set(key, inputs[key]);
        }
    }

    // 2. Capture stdout (print statements) from Python
    let output = [];
    pyodide.setStdout({ batched: (msg) => output.push(msg) });

    // 3. Run the code
    await pyodide.runPythonAsync(python);

    // 4. Send success back to the React Main Thread
    self.postMessage({ id, results: output.join('\n'), error: null });

  } catch (error) {
    // 5. Send error back to the React Main Thread
    self.postMessage({ id, results: null, error: error.message });
  }
};