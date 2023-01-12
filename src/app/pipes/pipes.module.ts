import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorPipe} from "./author.pipe";


@NgModule({
  declarations: [
    AuthorPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthorPipe
  ],
})
export class PipesModule {
}
