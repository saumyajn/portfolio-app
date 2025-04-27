import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { db } from '../services/firebase';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Link, Typography, Grid, Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const links = [
    { component: <GitHubIcon fontSize='large' />, text: 'Help me improve my Github', link: 'https://github.com/saumyajn' },
    // { component: <FacebookIcon fontSize='large' />, text: 'Connect with me on Facebook', link: 'https://www.facebook.com/saumya.jain.1023611' },
    { component: <LinkedInIcon fontSize='large' />, text: 'Connect with me on LinkedIn', link: 'https://www.linkedin.com/in/saumya-jain06/' }
]

const addEmail = async (val) => {
    try {
        const docRef = await addDoc(collection(db, 'formEmail'), {

            name: val.name,
            email: val.email,
            subject: val.subject,
            phone: val.phone,
            message: val.message

        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);

    }
}
export default function Contact() {

    let [inputs, setInputs] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
    let [showAlert, setShowAlert] = useState(false);
    let handleChange = (event) => {
        const { name, value } = event.target;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        setShowAlert(true);
        addEmail(inputs);
        setInputs({ name: '', email: '', subject: '', phone: '', message: '' })
    }
    return (
        <Box id="contact" sx={{
            height: { xs: '100%', sm: "100vh" },
            textAlign: 'left',
            marginLeft: 5, marginTop: '60px'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant='h4'>Let's Chat and Get in Touch</Typography>
                    <Typography variant='h6'>Tell me about your project or connect with me to start a new one together?</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <Stack spacing={2} direction="column" >
                        {links.map((link, index) => (
                            <Link key={index} target="_blank" underline="none" color='#a74500' href={link.link} sx={{
                                backgroundColor: '#f3e3c8cc', textTransform: 'unset', padding: '5px 5px', width: { xs: 280, sm: 350 },
                                height: '50px', borderRadius: ' 5px'
                            }} >
                                <Stack direction="row" alignItems='center'>

                                    {link.component}
                                    <Typography noWrap sx={{ marginLeft: '20px' }}>{link.text}</Typography>

                                </Stack>
                            </Link>
                        ))}
                    </Stack>
                </Grid>

            </Grid>
            <br />
            <Grid sx={{ marginTop: 5 }}>
                <Typography variant='h5'>
                    Connect with me
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <div>
                                <TextField name="name"
                                    id="name" label="Your Name" variant="filled" size="small" onChange={handleChange} value={inputs.name} required /></div>
                            <br />
                            <div>
                                <TextField
                                    name="email" id="email" label="Your Email" variant="filled" size="small" onChange={handleChange} value={inputs.email} required />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    name="subject" id="subject" label="Subject"
                                    variant="filled" size="small" onChange={handleChange} value={inputs.subject} required />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <div>
                                <TextField
                                    name="phone" id="phone" label="Phone No"
                                    variant="filled" size="small" onChange={handleChange} value={inputs.phone} />
                            </div>
                            <br />
                            <TextField name="message" id="message" label="Your message" multiline rows={4} variant="filled" size='small' sx={{ width: { xs: '30ch', sm: '40ch' } }} onChange={handleChange} value={inputs.message} required />

                        </Grid>
                    </Grid>
                    <br />
                    {showAlert ? <Alert icon={<CheckIcon fontSize="inherit" />} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    } severity="success" sx={{ background: '#33691edb', width: 'fit-content', marginBottom: '5px' }}>
                        Your form was successfully submitted.
                    </Alert> : ''}

                    <Button type="submit" variant='contained' color="primary">Submit</Button>

                </form>
            </Grid>
            <br />

        </Box>

    )
}