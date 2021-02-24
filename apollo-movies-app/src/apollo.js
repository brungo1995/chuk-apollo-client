import { ApolloClient, InMemoryCache, createHttpLink, } from '@apollo/client';

const cache = new InMemoryCache();

const link = new createHttpLink({
    uri: "http://localhost:4000/",
});

const client = new ApolloClient({
    cache: cache,
    link: link,
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                console.log(cache.writeData)
                // cache.writeData({
                //     id: `Movie:${id}`,
                //     data: {
                //         isLiked: !isLiked
                //     }
                // });
            }
        }
    }

})

export default client;