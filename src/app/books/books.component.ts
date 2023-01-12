import {Component} from '@angular/core';
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
export class BooksComponent {
  constructor(
    public bookService: BookService,
    private dialog: MatDialog
  ) {
  }

  public addBook() {
    const dialogRef = this.dialog.open(AddBookDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result).subscribe();
      }
    });
  }

  public editBook(book: IBook) {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.editBook(result).subscribe();
      }
    });
  }
}
