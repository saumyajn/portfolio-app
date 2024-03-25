import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import myimg from '../images/myimg.png';

import styles from '../styles/header.module.css'
export default function Home() {
    return (<div>
        <Box sx={{ height: '100vh', flexGrow: 1, margin: 1, textAlign: 'left' }}>
            <br />  <br />
            <Grid container spacing={1}>
                <Grid item xs={11} className={styles.home}>
                    <h1> Hi, </h1>
                    <h1>I am Saumya Jain
                    </h1>
                    <h2>Front end Developer</h2>
                    <Grid item xs={10} >
                    <h3>Front end developer who focuses on writing clean,

                        elegant and efficient code. Passionate about creating

                        solid and scalable interactive applications with great user exp.</h3>
                        </Grid>
                    <img src={myimg} className={styles.myImg} width={325} /></Grid>
            </Grid>
        </Box>
    </div>)
}