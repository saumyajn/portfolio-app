// Updated Contact.jsx with validation, loader, theme colors, and better UX
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { db } from '../services/firebase';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Link, Typography, Grid, Button, Card, CardContent, CircularProgress, useTheme } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import emailjs from "emailjs-com";

const LINKS = [
    {
        icon: GitHubIcon,
        text: 'Help me improve my Github',
        link: 'https://github.com/saumyajn',
    },
    {
        icon: LinkedInIcon,
        text: 'Connect with me on LinkedIn',
        link: 'https://www.linkedin.com/in/saumya-jain06/',
    },
];

const addContact = async (val) => {
    try {
        const docRef = await addDoc(collection(db, 'formEmail'), val);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export default function Contact() {

    const [inputs, setInputs] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const theme = useTheme();

    // Memoize email validity
    const isEmailValid = React.useMemo(() => {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email);
    }, [inputs.email]);

    // Memoize link rendering
    const renderLinks = React.useCallback(() => (
        LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
                <Link
                    key={index}
                    target="_blank"
                    underline="none"
                    color={theme.palette.secondary.main}
                    href={link.link}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '10px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.35)',
                        },
                    }}
                >
                    <Icon fontSize="large" />
                    <Typography>{link.text}</Typography>
                </Link>
            );
        })
    ), [theme.palette.secondary.main]);

    const handleChange = React.useCallback((e) => {
        const { name, value } = e.target;
        setInputs(values => ({ ...values, [name]: value }));
    }, []);


    function sendEmail(data) {
        // EmailJS expects a form or an object, so we send the data object directly
        emailjs
            .send(
                "service_f3cnhfn",   
                "template_25ncnyx",  
                data,
                "o9mgeDpc7oHyxG9GW"    
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    }

    const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);
        try {
            const submittedAt = new Date().toLocaleString();
            const dataWithDate = {
                ...inputs,
                submittedAt,
            };
            await addContact(dataWithDate);
            setShowAlert(true);
            sendEmail(dataWithDate);
            setInputs({ name: '', email: '', subject: '', phone: '', message: '' });

        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [inputs]);

    return (
        <Box id="contact" sx={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            scrollSnapAlign: 'start',
            px: 2,
            py: 8,
        }}>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    p: { xs: 2, sm: 4 },
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
            >
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Let's Chat and Get in Touch</Typography>
                            <Typography variant='h6' sx={{ mb: 3 }}>Tell me about your project or connect with me to start a new one together?</Typography>

                            <Stack spacing={2} direction="column">
                                {renderLinks()}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' gutterBottom>Connect with me</Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="name" label="Your Name" variant="filled" size="small" onChange={handleChange} value={inputs.name} required fullWidth />
                                        <TextField
                                            name="email"
                                            label="Your Email"
                                            variant="filled"
                                            size="small"
                                            onChange={handleChange}
                                            value={inputs.email}
                                            required
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            error={inputs.email.length > 0 && !isEmailValid}
                                            helperText={inputs.email.length > 0 && !isEmailValid ? "Enter a valid email" : ''}
                                        />
                                        <TextField name="subject" label="Subject" variant="filled" size="small" onChange={handleChange} value={inputs.subject} required fullWidth sx={{ mt: 2 }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="phone" label="Phone No" variant="filled" size="small" onChange={handleChange} value={inputs.phone} fullWidth />
                                        <TextField name="message" label="Your message" multiline rows={4} variant="filled" size='small' onChange={handleChange} value={inputs.message} required fullWidth sx={{ mt: 2 }} />
                                    </Grid>
                                </Grid>
                                {showAlert && (
                                    <Alert icon={<CheckIcon fontSize="inherit" />} action={
                                        <IconButton color="inherit" size="small" onClick={() => setShowAlert(false)}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    } severity="success" sx={{ background: '#33691edb', width: 'fit-content', mt: 3 }}>
                                        Your form was successfully submitted.
                                    </Alert>
                                )}
                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>Something went wrong. Please try again.</Alert>
                                )}
                                <Button type="submit" variant='contained' color="primary" sx={{ mt: 3 }} disabled={loading || !isEmailValid}>
                                    {loading ? <CircularProgress size={20} /> : 'Submit'}
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
