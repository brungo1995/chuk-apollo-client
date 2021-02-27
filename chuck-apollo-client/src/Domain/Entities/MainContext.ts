import { ICategory } from "./Category";

export interface IMainContext {
    loading: boolean;
    error: string;
    categories: ICategory[];
    category: ICategory;
    setCategory(category: ICategory): void
}