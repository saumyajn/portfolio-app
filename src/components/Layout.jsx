import { Outlet } from "react-router-dom";
import Header from "./header";
import * as React from 'react';
import { Grid } from "@mui/material";
export default function Layout(props) {

    const handleBack = (data) => {
        props.appPathCall(data)
    };
    const handlechangeTheme = (val) => {
        props.appChangeTheme(val)
    }
    return (<>
        <Grid sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={1} sm={3} md={3}>
                    <Header parentPathCall={handleBack} changeTheme={handlechangeTheme} />

                </Grid>
                <Grid item xs={11} sm={9} md={9}>

                    <Outlet />

                </Grid>
            </Grid>
        </Grid>

    </>)
}