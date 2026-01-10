import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert, ToggleButton, ToggleButtonGroup } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import usePython from '../hooks/usePython';

export default function PythonWidget({ appConfig }) {
    const { isReady, runScript } = usePython();
    
    // 1. Determine if this app has modes or just simple inputs
    const hasModes = !!appConfig.modes;
    
    // State for the active mode (default to first mode if exists)
    const [currentModeId, setCurrentModeId] = useState(hasModes ? appConfig.modes[0].id : null);
    
    // Helper to get the currently active config (either the mode or the root appConfig)
    const activeConfig = hasModes 
        ? appConfig.modes.find(m => m.id === currentModeId) 
        : appConfig;

    const [scriptContent, setScriptContent] = useState("");
    const [inputs, setInputs] = useState({});
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    // Reset state when the App OR the Mode changes
    useEffect(() => {
        setInputs({});
        setOutput(null);
        setError(null);
        
        // Load default values for the new active config
        const initialState = {};
        activeConfig.inputs.forEach(field => {
            initialState[field.name] = field.defaultValue || "";
        });
        setInputs(initialState);

        // Load the script
        fetch(activeConfig.scriptPath)
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.text();
            })
            .then(text => setScriptContent(text))
            .catch(err => setError(`Failed to load ${activeConfig.scriptPath}`));

    }, [appConfig, currentModeId]); // Re-run when app or mode changes

    const handleInputChange = (name, value) => {
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleRun = async () => {
        if (!isReady) return;
        setError(null);
        setOutput(null);
        try {
            const result = await runScript(scriptContent, inputs);
            setOutput(result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', p: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {appConfig.description}
            </Typography>

            {/* MODE TOGGLE SWITCH (Only renders if modes exist) */}
            {hasModes && (
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        value={currentModeId}
                        exclusive
                        onChange={(e, newMode) => {
                            if (newMode !== null) setCurrentModeId(newMode);
                        }}
                        aria-label="measurement system"
                        color="primary"
                        size="small"
                    >
                        {appConfig.modes.map((mode) => (
                            <ToggleButton key={mode.id} value={mode.id}>
                                {mode.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            )}

            {/* Dynamic Inputs (Based on activeConfig) */}
            {activeConfig.inputs.map((field) => (
                <TextField
                    key={field.name}
                    label={field.label}
                    type={field.type === 'number' ? 'number' : 'text'}
                    fullWidth
                    size="small"
                    value={inputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    sx={{ mb: 2 }}
                />
            ))}

            <Button
                variant="contained"
                startIcon={isReady ? <PlayArrowIcon /> : <CircularProgress size={20} color="inherit" />}
                fullWidth
                onClick={handleRun}
                disabled={!isReady || !scriptContent}
                sx={{ mb: 3, borderRadius: 2 }}
            >
                Run {hasModes ? activeConfig.label : "Script"}
            </Button>

            {output && (
                <Alert severity="success" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                     {output}
                </Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
}