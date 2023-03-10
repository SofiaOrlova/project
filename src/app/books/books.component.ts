import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {AddBookDialogComponent} from "./dialogs/add-book-dialog/add-book-dialog.component";
import {EditBookDialogComponent} from "./dialogs/edit-book-dialog/edit-book-dialog.component";
import {IBook} from "../interfaces/book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  constructor(
   // public bookService: BookService,
    private dialog: MatDialog,
    public bookService: BookService
  ) {
  }

  public books: IBook[] = [];

  ngOnInit(): void {
    this.loadBooks();
  }

  public addBooks(): void {
    this.bookService.generateBooks(10).subscribe(_ => {
      this.loadBooks();
    })
  }

  public deleteBooks(): void {
    this.bookService.deleteBooks().subscribe(_ => {
      this.loadBooks();
    })
  }

  public deleteBook(book: IBook) {
    this.bookService.deleteBook(book).subscribe(_ => {
      this.loadBooks();
    })
  }
  
  private loadBooks(): void {
    this.bookService.getBooks().subscribe(result => {
      this.books = result;
    })
  }

  public addBook() {
    const dialogRef = this.dialog.open(AddBookDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.addBook(result).subscribe(_ => {
          this.loadBooks();
        });
      }
      // this.loadBooks();
    });
  }

  // public addBook() {
  //   const dialogRef = this.dialog.open(AddBookDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.bookService.addBook(result).subscribe();
  //     }
  //   });
  // }

  // public editBook(book: IBook) {
  //   const dialogRef = this.dialog.open(EditBookDialogComponent, {
  //     data: { book, }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.bookService.editBook(result).subscribe(_ => {
  //         this.loadBooks();
  //       });
  //     }
  //   });
  // }
  public editBook(book: IBook) {
    let authorFullName: string = JSON.stringify(book.author);
    let authorFullNameTrimmed = authorFullName.substring(1, authorFullName.length - 1);
    let authorLastName: string = authorFullNameTrimmed.split(' ')[0];
    let authorFirstName: string = authorFullNameTrimmed.split(' ')[1];
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      // data: book,
      data: {
        id: book.id,
        name: book.name,
        author: {
          firstName: authorFirstName,
          lastName: authorLastName
        }
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.editBook(result).subscribe(_ => {
          this.loadBooks();
        });
      }
    });
  }
  
}
