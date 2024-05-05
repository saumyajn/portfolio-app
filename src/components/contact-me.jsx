import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Paper, Link } from '@mui/material';
export default function Contact() {
    return (
        <Box sx={{ height: '100vh', textAlign: 'left', marginLeft: 5 }}>
            <h2>Contact Me</h2>
            <Stack spacing={2}>
                <Paper style={{ backgroundColor: '#ffffff30', textTransform:'unset', padding: '5px 5px', width: 350 }}>
                    <Link color='#000' href="#">
                        <GitHubIcon fontSize='large' /> Help me improve Github
                    </Link>
                </Paper>

                <Paper style={{ backgroundColor: '#ffffff30', padding: '5px 5px', width: 350 }}>
                    <Link color='#000' href="#">
                        <FacebookIcon fontSize='large' />
                        Connect with me on Facebook
                    </Link>
                </Paper>
                <Paper style={{ backgroundColor: '#ffffff30', padding: '5px 5px', width: 350 }}>
                    <Link color='#000' href="#">  <LinkedInIcon fontSize='large' />
                        Link with me on LinkedIn
                    </Link>
                </Paper>

            </Stack>

            <form>
                <label>
                    Send me an email
                </label>
            </form>
            {/* Linkedin
            Facebook
            Github
            Twitter */}
            {/* Send me an email */}
        </Box>

    )
}