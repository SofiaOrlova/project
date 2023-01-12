import {Injectable} from '@angular/core';
import {IBook} from "../interfaces/book";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _currentId: number = 1;

  private _books: IBook[] = [
    {
      id: 1,
      name: 'Дюна',
      author: {
        firstName: 'Френк',
        lastName: 'Герберт'
      }
    }
  ];

  constructor() {
  }

  public getList(): Observable<IBook[]> {
    return of(this._books);
  }

  public addBook(book: IBook): Observable<any> {
    this._currentId++;
    book.id = this._currentId;
    this._books.push(book);
    return of();
  }

  public editBook(book: IBook): Observable<any> {
    const index = this._books.findIndex(b => b.id == book.id);
    if (index != -1) {
      this._books[index] = book;
    }
    return of();
  }
}
