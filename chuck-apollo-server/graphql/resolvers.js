const { default: axios } = require('axios');

const fetchCategories = async () => {
    try {
        const { data } = await axios.get("https://api.chucknorris.io/jokes/categories");
        const categories = (data || []).map(category => {
            return {
                name: category
            }
        });
        return categories
    } catch (error) {
        console.log(error);
        return []
    }
}

const fectchRandomJoke = async (category) => {
    try {
        const { data } = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        return data
    } catch (error) {
        console.log(error);
        return {}
    }
}


module.exports = {
    resolvers: {
        Query: {
            categories: () => fetchCategories(),
            randomJoke: (_, { category }) => fectchRandomJoke(category)
        }
    }
}


