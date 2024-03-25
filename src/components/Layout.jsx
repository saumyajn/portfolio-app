import { Outlet } from "react-router-dom";
import Header from "./header";

import { Grid } from "@mui/material";
export default function Layout(props) {
    let state = {
        msg: ""
    };

    const handleBack = (data) => {
        props.appCallBack(data)
    }
    return (<>

        <Grid sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4} md={2}>
                    <Header parentCallBack={handleBack} />
                </Grid>
                <Grid item xs={8} md={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </Grid>

    </>)
}