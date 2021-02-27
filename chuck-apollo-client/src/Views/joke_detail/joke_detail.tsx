import React, { useContext } from 'react'
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { JokeDetailStyles } from "./joke_detail.styles"
import moment from "moment";
import placeholderImage from "../../assets/placeholder_image.jpg"

import { MainContext } from "../../context_providers/main_context";
const JokeDetail = () => {
    const classes = JokeDetailStyles();
    const { joke } = useContext(MainContext);
    const { categories, created_at, icon_url, id, updated_at, url, value } = joke


    return (
        <div>
            <Container className={classes.container} >
                <Grid container spacing={3} >
                    <div className={classes.root}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} style={{
                                display: "flex",
                                justifyContent: 'space-between'
                            }}>
                                <Typography className={classes.typography}>Category: {categories}</Typography>
                                <img
                                    src={icon_url || placeholderImage}
                                    alt="joke icon"
                                    style={{
                                        display: "block",
                                        height: icon_url ? "fit-content" : "60px"
                                    }} />
                            </Grid>
                            <Grid item xs={12}  >
                                <Typography className={classes.typography}>Updated at: {moment(created_at).format("Do MMM  YY")}</Typography>
                                <Paper className={classes.paper}>{joke.value}</Paper>
                                <Typography className={classes.typography}>{moment(updated_at).format("Do MMM  YY")}</Typography>
                                <Typography className={classes.typography}>
                                    <a href={url} style={{ textDecoration: "none", color: "black" }} target="blank">Link to the joke</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        </div>
    )
}

export default JokeDetail
