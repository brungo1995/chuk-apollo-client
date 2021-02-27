import React, { useContext } from 'react';
import { Container, Grid } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import JokeDetail from '../joke_detail/joke_detail';
import { MainContext } from "../../context_providers/main_context";
import { HomeStyles } from "./home.styles"
// import { CircularProgress, Typography } from '@material-ui/core';
import { ICategory } from '../../Domain/Entities/Category';

function Home() {
    const classes = HomeStyles();
    const { categories, loading, category, setCategory } = useContext(MainContext)

    const handleChange = (event: React.ChangeEvent<{ value: unknown, name?: string | undefined }>) => {
        const name = event.target.name || "name";
        setCategory({ ...category, [name]: event.target.value })
    };

    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={3} style={{
                    justifyContent: 'center'
                }}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category?.name || ""}
                            onChange={handleChange}
                            label="Age"
                            name="name"
                        >
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}

                            {
                                !loading && (categories || [])
                                    .map((category: ICategory, index) =>
                                        <MenuItem key={index} value={category.name}>
                                            {category.name}
                                        </MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </Grid>
                <JokeDetail />
            </Container>
        </>
    )
}

export default Home;