import React, { useState, useEffect, createContext } from 'react';
import { ICategory } from "../Entities/Category";
import { IJoke } from "../Entities/Joke";
import { IMainContext } from "../Entities/MainContext";
import { gql } from '@apollo/client';
import { client } from "../util/apollo";

export const MainContext = createContext<IMainContext>({} as IMainContext);

export function MainProvider({ children = null }: React.PropsWithChildren<{}>) {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory>({} as ICategory);
    const [joke, setJoke] = useState<IJoke>({} as IJoke);
    const [searchByCategoryname, setSearchByCategoryname] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchingJoke, setFetchingJoke] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getJokeCategories();
    }, []);

    useEffect(() => {
        searchByCategoryname !== "" && getRandomJokeByCategory();
    }, [searchByCategoryname]);

    async function getJokeCategories(): Promise<void> {
        try {
            setLoading(true)
            const { data, error } = await client.query({
                query: gql`
                    query{
                        categories{
                            name
                        }
                    }
                `
            });


            if (error) {
                setError(error.message);
                return
            }

            const apiCategories: ICategory[] = data.categories
            setCategories(apiCategories)
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setCategories([]);
            setError(error.message);
            console.log(error)
        }
    }

    async function getRandomJokeByCategory(): Promise<void> {
        try {
            setFetchingJoke(true)
            const { data, error } = await client.query({
                fetchPolicy: 'network-only',
                query: gql`
                    query getRandomJoke($category: String! = "${searchByCategoryname}"){
                        randomJoke(category: $category){
                            categories
                            created_at
                            icon_url
                            id
                            updated_at
                            url
                            value
                        }
                    }
                `
            });

            setFetchingJoke(false)

            if (error) {
                setError(error.message);
                return
            }
            const apiJoke: IJoke = data.randomJoke
            setJoke(apiJoke);

        } catch (error) {
            setFetchingJoke(false)
            setCategory({} as ICategory);
            setError(error.message);
            console.log(error)
        }
    }

    return (
        <MainContext.Provider
            value={{
                loading,
                fetchingJoke,
                error,
                categories,
                category,
                searchByCategoryname,
                joke,
                setError,
                setCategory,
                setSearchByCategoryname,
                getRandomJokeByCategory,
            }}>
            {children}
        </MainContext.Provider>
    );

};