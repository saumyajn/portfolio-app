import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Paper, Button, TextField, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import usePython from '../../hooks/usePython'; // Adjust path if needed

export default function TreasureIsland() {
    const navigate = useNavigate();
    const { runScript, isReady } = usePython();

    const [scriptContent, setScriptContent] = useState("");
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const bottomRef = useRef(null);

    // 1. Load the specific Python file
    useEffect(() => {
        fetch('/python/treasure_island.py')
            .then(res => res.text())
            .then(text => setScriptContent(text))
            .catch(err => console.error("Failed to load script", err));
    }, []);

    // 2. Start the script automatically once ready
    useEffect(() => {
        if (isReady && scriptContent && history.length === 0) {
            runGame(""); // Run with empty input to trigger the first question
        }
    }, [isReady, scriptContent]);

    // 3. Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // 4. Run Logic
    const runGame = async (userCommand) => {
        try {
            // Pass user input as variable 'cmd'
            const output = await runScript(scriptContent, { cmd: userCommand });

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
        <Container  sx={{ py: 8 }}>

            {/* HEADER */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/python')} variant="outlined">
                    Back
                </Button>
                <Typography sx={{ fontWeight: 'bold' }}>
                    <h1>Treasure Island</h1>

                    <p>Welcome to the Treasure Island adventure game! Your quest to find the hidden treasure begins here.</p>
                </Typography>

            </Box>
                    

            {/* TERMINAL UI */}
            <Paper elevation={6} sx={{ bgcolor: '#0f0e0eff', color: '#00ff00', p: 4,  minHeight: '400px', width: '100%', borderRadius: 2 }}>

                {/* Output Log */}
                <Box sx={{ height: '500px', overflowY: 'auto', mb: 2 }}>
                    {!isReady && <Typography sx={{ color: '#aaa' }}>Loading Python...</Typography>}
                    
                    {history.map((line, i) => (
                        line.text && (
                            <Typography key={i} sx={{
                                fontSize:"12px",
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