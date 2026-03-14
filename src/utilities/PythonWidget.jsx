import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import usePython from '../hooks/usePython';
import Editor from '@monaco-editor/react';

export default function PythonWidget({ appConfig }) {
    const theme = useTheme();
    const { isReady, runScript } = usePython();
    
    const hasModes = !!appConfig.modes;
    const [currentModeId, setCurrentModeId] = useState(hasModes ? appConfig.modes[0].id : null);
    
    const activeConfig = hasModes ? appConfig.modes.find(m => m.id === currentModeId) : appConfig;

    const [scriptContent, setScriptContent] = useState("");
    const [inputs, setInputs] = useState({});
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setInputs({});
        setOutput(null);
        setError(null);
        
        const initialState = {};
        activeConfig.inputs?.forEach(field => {
            initialState[field.name] = field.defaultValue || "";
        });
        setInputs(initialState);

        fetch(activeConfig.scriptPath)
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.text();
            })
            .then(text => {
                if (text.trim().toLowerCase().startsWith('<!doctype html>')) {
                    throw new Error(`The file is missing! Could not find ${activeConfig.scriptPath} in your public/ folder.`);
                }
                setScriptContent(text); // Stored in the background, NO LONGER DISPLAYED!
            })
            .catch(err => setError(err.message));

    }, [appConfig, currentModeId]);

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
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {appConfig.description}
            </Typography>

            {hasModes && (
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        value={currentModeId}
                        exclusive
                        onChange={(e, newMode) => {
                            if (newMode !== null) setCurrentModeId(newMode);
                        }}
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

            {/* DYNAMIC INPUT RENDERING */}
            {activeConfig.inputs && activeConfig.inputs.map((field) => {
                
                // If the app asks for CODE, render the Monaco Editor mapped to user input!
                if (field.type === 'code') {
                    return (
                        <Box key={field.name} sx={{ mb: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, overflow: 'hidden' }}>
                            <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5', color: 'text.secondary', fontWeight: 'bold' }}>
                                {field.label}
                            </Typography>
                            <Editor
                                height="250px"
                                defaultLanguage="python"
                                theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
                                value={inputs[field.name] || ''}
                                onChange={(value) => handleInputChange(field.name, value)}
                                options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false }}
                            />
                        </Box>
                    );
                }

                // Otherwise, render normal Text/Number fields
                return (
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
                );
            })}

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

            {/* TERMINAL OUTPUT BOX */}
            {output && (
                <Box sx={{ 
                    bgcolor: '#1e1e1e', 
                    color: '#00ff00', 
                    p: 2, 
                    fontFamily: 'monospace', 
                    borderRadius: 1,
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap'
                }}>
                    {Array.isArray(output) ? output.map((log, i) => <div key={i}>{log}</div>) : output}
                </Box>
            )}

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
    );
}