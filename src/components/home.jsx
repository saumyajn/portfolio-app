import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import myimg from '../images/formal-img.jpg';

import styles from '../styles/header.module.css'
export default function Home() {
    let code = "<h3>";
    let codeEnd = "</h3>"
    return (<div>
        <Box sx={{height:{xs: '100%', sm:"100vh"}, textAlign: 'left' }}>
            <br />  <br />
            <Grid container spacing={1}>

                <Grid item xs={10} sm={8} md={7}> <h1> Hi, </h1>
                    <h1>I am Saumya Jain
                    </h1>
                    <h2>Front end Developer</h2>
                    <h3> {code}Coder, Artist, Animal Lover{codeEnd}</h3><h3>
                        Front end developer who focuses on writing clean,

                        elegant and efficient code. Passionate about creating

                        solid and scalable interactive applications with great user experience.</h3>
                </Grid>
                <Grid item xs={4} sm={4} md={5}>
                    <img src={myimg} className={styles.myImg} width={325} alt="saumya-jain" />
                </Grid>




            </Grid>
        </Box>
    </div >)
}