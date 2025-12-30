import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Typography, Grid, Button, Card, CardContent, CircularProgress, useTheme, Link as MuiLink } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import emailjs from "emailjs-com";
import { db } from '../services/firebase';

const LINKS = [
    {
        icon: GitHubIcon,
        title: 'Check out my Code',
        subtitle: 'Explore my repositories and contributions',
        link: 'https://github.com/saumyajn',
        color: '#333' // Github black
    },
    {
        icon: LinkedInIcon,
        title: 'Connect on LinkedIn',
        subtitle: 'View my professional journey',
        link: 'https://www.linkedin.com/in/saumya-jain06/',
        color: '#0077b5' // LinkedIn Blue
    },
];

export default function Contact() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    
    const [inputs, setInputs] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: false });

    // Simple Email Validation
    const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email), [inputs.email]);
    const canSubmit = inputs.name && inputs.email && inputs.message && isEmailValid;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: false });

        try {
            const submissionData = { ...inputs, submittedAt: new Date().toLocaleString() };

            // 1. Send to Firebase
            await addDoc(collection(db, 'formEmail'), submissionData);

            // 2. Send Email via EmailJS
            await emailjs.send(
                "service_f3cnhfn",   
                "template_25ncnyx",  
                submissionData,
                "o9mgeDpc7oHyxG9GW"    
            );

            setStatus({ loading: false, success: true, error: false });
            setInputs({ name: '', email: '', subject: '', phone: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus({ loading: false, success: false, error: true });
        }
    };

    return (
        <Box id="contact" sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', py: 10, px: 2 }}>
            <Card
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    mx: 'auto',
                    p: { xs: 2, md: 5 },
                    borderRadius: '24px',
                    // Consistent Glassmorphism
                    backdropFilter: 'blur(20px)',
                    backgroundColor: isDarkMode ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                    boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <CardContent>
                    <Grid container spacing={8}>
                        
                        {/* LEFT SIDE: Context & Links */}
                        <Grid item xs={12} md={5}>
                            <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 1.5 }}>
                                CONTACT
                            </Typography>
                            <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Quicksand', fontWeight: 700 }}>
                                Let's work together.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, lineHeight: 1.8 }}>
                                I am currently <strong>available for opportunities</strong>. Whether you have a project in mind or just want to say hi, feel free to send me a message!
                            </Typography>

                            <Stack spacing={2}>
                                {LINKS.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <MuiLink
                                            key={idx}
                                            href={item.link}
                                            target="_blank"
                                            underline="none"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 3,
                                                p: 2,
                                                borderRadius: 3,
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                                    transform: 'translateX(5px)'
                                                }
                                            }}
                                        >
                                            <Box sx={{ 
                                                p: 1.5, 
                                                borderRadius: '70%', 
                                                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#fff',
                                                color: isDarkMode ? '#fff' : item.color,
                                                boxShadow: 1
                                            }}>
                                                <Icon fontSize="medium"  />
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1rem' }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.subtitle}
                                                </Typography>
                                            </Box>
                                        </MuiLink>
                                    )
                                })}
                            </Stack>
                        </Grid>

                        {/* RIGHT SIDE: The Form */}
                        <Grid item xs={12} md={7}>
                            <Box 
                                component="form" 
                                onSubmit={handleSubmit} 
                                sx={{ 
                                    p: { xs: 0, md: 3 }
                                }}
                            >
                                <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                                    Send a Message
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            fullWidth 
                                            label="Name" 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            variant="outlined"
                                            required
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            fullWidth 
                                            label="Email" 
                                            name="email" 
                                            value={inputs.email} 
                                            onChange={handleChange} 
                                            variant="outlined" 
                                            required
                                            error={inputs.email.length > 0 && !isEmailValid}
                                            helperText={inputs.email.length > 0 && !isEmailValid ? "Invalid email address" : ""}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            fullWidth 
                                            label="Subject" 
                                            name="subject" 
                                            value={inputs.subject} 
                                            onChange={handleChange} 
                                            variant="outlined"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            fullWidth 
                                            label="Message" 
                                            name="message" 
                                            multiline 
                                            rows={5} 
                                            value={inputs.message} 
                                            onChange={handleChange} 
                                            variant="outlined"
                                            required
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Grid>
                                </Grid>

                                {status.success && (
                                    <Alert 
                                        severity="success" 
                                        sx={{ mt: 3, borderRadius: 3 }}
                                        action={
                                            <IconButton size="small" onClick={() => setStatus({ ...status, success: false })}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        Message sent successfully! I'll get back to you soon.
                                    </Alert>
                                )}

                                {status.error && (
                                    <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                                        Failed to send message. Please try again or email me directly.
                                    </Alert>
                                )}

                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="large" 
                                    disabled={!canSubmit || status.loading}
                                    endIcon={status.loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                    sx={{ 
                                        mt: 4, 
                                        borderRadius: '50px', 
                                        px: 5, 
                                        py: 1.5, 
                                        textTransform: 'none', 
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        boxShadow: theme.shadows[4]
                                    }}
                                >
                                    {status.loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}