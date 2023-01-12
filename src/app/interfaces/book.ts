import {IAuthor} from "./author";

export interface IBook {
  id: number;
  name: string;
  author: IAuthor
}
