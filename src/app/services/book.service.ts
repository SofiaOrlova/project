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


  public addBook(book: IBook): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'books', {
      author: book.author.lastName + ' ' + book.author.firstName,
      name: book.name,
    });
  }


  public editBook(book: IBook): Observable<any> {
    return this.httpClient.put(environment.apiUrl + 'books/' + book.id, {
      author: book.author.lastName + ' ' + book.author.firstName,
      name: book.name,
    });
  }

  public deleteBook = (book: IBook): Observable<any> =>
    this.httpClient.delete<IBook[]>(environment.apiUrl + `books/${book.id}`, {})
      .pipe(
        tap({
          complete: (() => this.getBooks().subscribe(b => this._books = b))
        })
      )
}
