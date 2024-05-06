import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { db } from '../services/firebase';
// import 'firebase/firestore';
import TextField from '@mui/material/TextField';
import { Link, Typography, Grid, Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const links = [
    { component: <GitHubIcon fontSize='large' />, text: 'Help me improve Github', link: 'https://github.com/saumyajn' },
    // { component: <FacebookIcon fontSize='large' />, text: 'Connect with me on Facebook', link: 'https://www.facebook.com/saumya.jain.1023611' },
    { component: <LinkedInIcon fontSize='large' />, text: 'Link with me on LinkedIn', link: 'https://www.linkedin.com/in/saumya-jain06/' }
]

const addEmail = async (val) => {
    try {
        const docRef = await addDoc(collection(db, 'formEmail'), {

            name: val.name,
            email: val.email,
            subject: val.subject,
            message: val.message

        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);

    }
}
export default function Contact() {

    const [inputs, setInputs] = useState({ name: '', email: '', subject: '', phone:'',message: '' });
    const handleChange = (event) => {
        const { name, value } = event.target;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        addEmail(inputs)
    }
    return (
        <Box sx={{
            height: { xs: '100%', md: "100vh" }, textAlign: 'left',
            marginTop: 7, marginLeft: 5
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant='h3'>Let's Chat and Get in Touch</Typography>
                    <Typography variant='h6'>Tell me about your project or connect with me to start a new one together?</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <Stack spacing={2} direction="column" >
                        {links.map((link, index) => (
                            <Link key={index} target="_blank" underline="none" color='#a74500' href={link.link} style={{
                                backgroundColor: '#f3e3c8cc', textTransform: 'unset', padding: '5px 5px', width: 350,
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
                            <br/>
                            <TextField name="message" id="message" label="Your message" multiline rows={4} variant="filled" size='small' sx={{ width: '40ch' }} onChange={handleChange} value={inputs.message} required />

                        </Grid>
                    </Grid>
                    <br />
                    <Button type="submit" variant='contained' color="inherit">Submit</Button>
                </form>
            </Grid>
            <br />

        </Box>

    )
}