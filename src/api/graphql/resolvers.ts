import axios from 'axios'

const fetchCategories = async () => {
    try {
        const { data } = await axios.get("https://api.chucknorris.io/jokes/categories");
        const categories = (data || []).map((category: string) => {
            return {
                name: category
            }
        });
        return categories
    } catch (error) {
        console.log(error);
        return error
    }
}

const fectchRandomJoke = async (category: string) => {
    try {
        const { data } = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        return data
    } catch (error) {
        console.log(error);
        return error
    }
}


export default {
    Query: {
        categories: () => fetchCategories(),
        randomJoke: (_: any, { category }: { category: string }) => fectchRandomJoke(category)
    }
}


