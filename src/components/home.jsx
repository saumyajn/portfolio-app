import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import myimg from '../images/formal-img.jpg';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../styles/header.module.css';
import myResume from '../assets/Saumya_Jain_resume.pdf'
export default function Home() {

    return (<div>
        <Box sx={{ height: { xs: '100%', sm: "100vh" }, textAlign: 'left' }}>
            <br />  <br />
            <Grid container spacing={1}>

                <Grid item xs={10} sm={8} md={7}>
                    <h1> Hi, </h1>
                    <h1>I am Saumya Jain
                    </h1>
                    <h2>Front end Developer</h2>
                    <h4 style={{ fontStyle: 'italic' }}>Coder, Artist, Animal Lover</h4>
                    <h3>

                        Front end developer and painter with keen eye for

                        creating engaging UI and bringing products to life.
                        Passionate about creating solid and scalable interactive applications with great user experience.</h3>
                    <Stack spacing={2} direction="row">
                        <a href={myResume} target="_blank" download rel='noreferrer'><Button variant='contained'>Get a copy</Button></a>
                          </Stack>
                </Grid>
                <Grid item xs={4} sm={4} md={5}>
                    <img src={myimg} className={styles.myImg} width={325} alt="saumya-jain" />
                </Grid>

            </Grid>
        </Box>
    </div >)
}