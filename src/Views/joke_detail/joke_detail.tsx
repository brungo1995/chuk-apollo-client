import React, { useContext } from 'react'
import { Button, CircularProgress, Container, Grid, Paper, Typography, } from '@material-ui/core';
import { JokeDetailStyles } from "./joke_detail.styles"
import moment from "moment";
import placeholderImage from "../../assets/placeholder_image.jpg"
import { MainContext } from "../../context_providers/main_context";
import { capitalizeFirstLetter } from "../../util/utils"
import { AlertContext } from '../../context_providers/alert_context';

const JokeDetail = () => {
    const classes = JokeDetailStyles();
    const { errorAlert } = useContext(AlertContext)
    const { joke, fetchingJoke, error, setError, getRandomJokeByCategory } = useContext(MainContext);
    const { categories: jokeCategories, created_at, icon_url, updated_at, url, value } = joke;
    const categories = (jokeCategories || []).map(category => capitalizeFirstLetter(category)).join(", ");
    const createAt = moment(created_at).format("Do MMM  YYYY")
    const updatedAt = moment(updated_at).format("Do MMM  YYYY");


    function renderLoading(): JSX.Element {
        if (fetchingJoke) {
            return (
                <Grid container spacing={3} style={{ justifyContent: 'center', marginTop: "3rem" }}>
                    <CircularProgress />
                </Grid>
            )
        }
        return <></>
    }


    function renderJoke(): JSX.Element {
        const showJoke = joke && joke.id && !fetchingJoke;
        if (showJoke) {
            return (
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
                                        style={{ height: icon_url ? "fit-content" : "60px" }} />
                                </Grid>
                                <Grid item xs={12}  >
                                    <Typography className={classes.typography}>Updated at: {updatedAt}</Typography>
                                    <Paper className={classes.paper}>{value}</Paper>
                                    <Grid item xs={12} style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <Typography className={classes.typography}>Created at: {createAt}</Typography>
                                        <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}
                                            onClick={getRandomJokeByCategory}>
                                            Give me one more 😃
                                        </Button>
                                    </Grid>
                                    <Typography className={classes.typography} style={{ textAlign: "center" }} >
                                        <a href={url} className={classes.link} target="blank">Take me to the joke page 🚀</a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Container>
            )
        }

        return <></>
    }

    function renderError() {
        if (error) {
            errorAlert(error, () => {
                setError("")
            })
        }

    }


    return (
        <div>
            {renderLoading()}
            {renderJoke()}
            {renderError()}
        </div>
    )
}

export default JokeDetail
