import React, { useContext } from 'react';
import { Container, Grid } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MainContext } from "../../context_providers/main_context";
import { HomeStyles } from "./home.styles"
import { ICategory } from '../../Domain/Entities/Category';
import JokeDetail from "../../Views/joke_detail/joke_detail"
import { capitalizeFirstLetter } from '../../util/utils';

function Home() {
    const classes = HomeStyles();
    const { categories, loading, searchByCategoryname, setSearchByCategoryname } = useContext(MainContext)

    const handleChange = (event: React.ChangeEvent<any>) => {
        const name = event.target.value;
        setSearchByCategoryname(name);
    }


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
                            value={searchByCategoryname || ""}
                            onChange={handleChange}
                            label="Categories"
                        >
                            {
                                !loading && (categories || [])
                                    .map((category: ICategory, index) =>
                                        <MenuItem key={index} value={category.name}>
                                            {capitalizeFirstLetter(category.name)}
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