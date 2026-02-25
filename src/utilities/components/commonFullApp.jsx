import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import usePython from '../../hooks/usePython'; // Adjust path if needed
import { useTheme } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

export default function TreasureIsland() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { runScript, isReady } = usePython();
    const data = useLoaderData();

    const [scriptContent, setScriptContent] = useState("");
    const [dependencies, setDependencies] = useState([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const bottomRef = useRef(null);

    // Simple fetch for the python script
    const fetchScript = async () => {
        try {
            const res = await fetch(`/python/${data.pythonFile}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();

            if (data.dependencies) {
                const loadedDeps = await Promise.all(
                    data.dependencies.map(async (dep) => {
                        const depRes = await fetch(`/python/${dep.path}`);
                        const depText = await depRes.text();
                        return { name: dep.name, content: depText };
                    })
                );
                setDependencies(loadedDeps);
            }
            setScriptContent(text);
            setHistory([]); // reset conversation when script reloads
        } catch (err) {
            console.error('Failed to load script', err);
        }
    };

    useEffect(() => {
        fetchScript();
    }, [data.pythonFile]);

    // 2. Start the script automatically once ready
    useEffect(() => {
        if (isReady && scriptContent && history.length === 0) {
            runGame(""); // Run with empty input to trigger the first question
        }
    }, [isReady, scriptContent]);



    const runGame = async (userCommand) => {
        try {
            // Pass user input as variable 'cmd'
            const output = await runScript(scriptContent, { cmd: userCommand }, dependencies);

            setHistory(prev => [
                ...prev,
                { type: 'user', text: userCommand ? `> ${userCommand}` : '' },
                { type: 'bot', text: output }
            ]);
        } catch (err) {
            setHistory(prev => [...prev, { type: 'error', text: `Error: ${err.message}` }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        runGame(input);
        setInput("");
    };

    return (
        <Container sx={{ py: 8 }}>

            {/* HEADER */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/python')} variant="outlined">
                    Back
                </Button>
                <Button onClick={() => { setScriptContent(""); setHistory([]); fetchScript(); }} variant="outlined">
                    Reload
                </Button>
                <Typography component="div" sx={{ fontWeight: 'bold' }}>
                    <h1>{data.title}</h1>

                    <p>{data.description}</p>
                </Typography>

            </Box>


            {/* TERMINAL UI */}
            <Paper elevation={6}
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#2b2b2b',
                    color: '#00ff00', p: 4, minHeight: '400px', width: '100%', borderRadius: 2
                }}>

                {/* Output Log */}
                <Box sx={{ height: '500px', overflowY: 'auto', mb: 2 }}>
                    {!isReady && <Typography sx={{ color: '#aaa' }}>Loading Python runtime...</Typography>}

                    {history.map((line, i) => (
                        line.text && (
                            <Typography key={i} sx={{
                                fontSize: "12px",
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'monospace',
                                color: line.type === 'user' ? '#ffff00' : '#00ff00',
                                mb: 1
                            }}>
                                {line.text}
                            </Typography>
                        )
                    ))}

                    <div ref={bottomRef} />
                </Box>

                {/* Input Bar */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                    <Typography sx={{ color: '#00ff00', py: 1 }}>&gt;&gt;&gt;</Typography>
                    <TextField
                        fullWidth variant="standard"
                        placeholder={isReady ? "Enter input..." : "Loading..."}
                        value={input} onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                        InputProps={{ disableUnderline: true, style: { color: '#fff', fontFamily: 'monospace' } }}
                    />
                    <Button type="submit" variant="contained" color="success" disabled={!isReady} endIcon={<SendIcon />}>
                        Enter
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}