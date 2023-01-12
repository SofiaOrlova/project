import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IBook} from "../../../interfaces/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss']
})
export class EditBookDialogComponent implements OnInit {

  public book: IBook = {
    name: 'Инквизитор Эйзенхорн',
    author: {
      firstName: 'Ден',
      lastName: 'Абнетт'
    }
  } as IBook;

  public bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    })
  });

  public get name(): FormControl {
    return this.bookForm.get('name') as FormControl;
  }

  public get author(): FormGroup {
    return this.bookForm.get('author') as FormGroup;
  }

  public get firstName(): FormControl {
    return this.author.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.author.get('lastName') as FormControl;
  }

  constructor(
    public dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IBook,
  ) {
  }

  public ngOnInit() {
    if (this.data) {
      this.name.setValue(this.data.name);
      this.firstName.setValue(this.data.author.firstName);
      this.lastName.setValue(this.data.author.lastName);
    }
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public onAddClick() {
    if (this.bookForm.invalid) return;

    let book = {
      id: this.data?.id,
      name: this.name.value,
      author: {
        firstName: this.firstName.value,
        lastName: this.lastName.value
      }
    } as IBook;

    this.dialogRef.close(book);
  }
}




