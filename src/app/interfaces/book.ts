import {IAuthor} from "./author";

export interface IBook {
  // id: number;
  id: string;
  name: string;
  author: IAuthor
}
