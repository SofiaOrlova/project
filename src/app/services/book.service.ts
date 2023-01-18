import {Injectable} from '@angular/core';
import {IBook} from "../interfaces/book";
import {Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _books: IBook[] = [];

  constructor( private httpClient: HttpClient,
    private authService: AuthService) {
      this.getBooks().subscribe(b => this._books = b)
  }

  public getBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books');
  }

  public generateBooks(count: number): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'books/generate/' + count, {});
  }

  public deleteBooks(): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'books');
  }

  // public addBook(book: IBook): Observable<any> {
  //   this._currentId++;
  //   book.id = this._currentId;
  //   this._books.push(book);
  //   return of();
  // }

  // public editBook(book: IBook): Observable<any> {
  //   const index = this._books.findIndex(b => b.id == book.id);
  //   if (index != -1) {
  //     this._books[index] = book;
  //   }
  //   return of();
  // }

  public editBook = (book: IBook): Observable<any> =>
  this.httpClient.put<IBook[]>(environment.apiUrl + `books/${book.id}`, 
    { name: book.name, author: {firstName: book.author.firstName, lastName: book.author.lastName } }, {
      headers: new HttpHeaders({ ['Content-Type']: 'application/json' })
  })
    .pipe(
      tap({
        complete: (() => this.getBooks().subscribe(b => this._books = b))
      })
    )

  public deleteBook = (book: IBook): Observable<any> =>
    this.httpClient.delete<IBook[]>(environment.apiUrl + `books/${book.id}`, {})
      .pipe(
        tap({
          complete: (() => this.getBooks().subscribe(b => this._books = b))
        })
      )
}
