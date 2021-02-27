import React, { useState, useEffect, createContext } from 'react';
import { ICategory } from "../Domain/Entities/Category";
// import { IJoke } from "../Domain/Entities/Joke";
import { IMainContext } from "../Domain/Entities/MainContext";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, } from '@apollo/client';

// import CategoryRepository from "../Data/Repositories/CategoryRepository";

export const MainContext = createContext<IMainContext>({} as IMainContext);

export function MainProvider({ children = null }: React.PropsWithChildren<{}>) {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache()
    });


    const [categories, setCategories] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory>({} as ICategory);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getJokeCategories();
    }, []);

    useEffect(() => {
        category?.name && getRandomJokeByCategory();
    }, [category]);

    async function getJokeCategories(): Promise<void> {
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
    }

    async function getRandomJokeByCategory(): Promise<void> {
        console.log(category)
        // const { data, error } = await client.query({
        //     query: gql`
        //         query($category: String!){
        //             randomJoke(category: $category){
        //                 categories
        //                 created_at
        //                 icon_url
        //                 id
        //                 updated_at
        //                 url
        //                 value

        //             }
        //         }
        //     `
        // });

        // if (error) {
        //     setError(error.message);
        //     return
        // }

        // const apiCategory: ICategory = data.category
        // setCategory(apiCategory)
    }

    return (
        <MainContext.Provider
            value={{
                loading,
                error,
                categories,
                category,
                setCategory
            }}>
            {children}
        </MainContext.Provider>
    );

};