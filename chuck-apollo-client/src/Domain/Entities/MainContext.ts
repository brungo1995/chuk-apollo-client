import { ICategory } from "./Category";
import { IJoke } from "./Joke";

export interface IMainContext {
    loading: boolean;
    fetchingJoke: boolean;
    error: string;
    joke: IJoke;
    searchByCategoryname: string;
    categories: ICategory[];
    category: ICategory;
    setCategory(category: ICategory): void
    setSearchByCategoryname(name: string): void
    getRandomJokeByCategory(): Promise<void>
}