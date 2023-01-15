import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import {BooksComponent} from "./books/books.component";
import {PageOneComponent} from "./pages/page-one/page-one.component";
import {PageTwoComponent} from "./pages/page-two/page-two.component";
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page-1',
    pathMatch: 'full'
    
  },
  {
    path: 'page-1',
    component: PageOneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  // {
  //   path: 'page-2',
  //   component: PageTwoComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'page-3',
    component: PageTwoComponent,
    canActivate: [AuthGuard]
  }
  //,
  // {
  //   path: 'page-4',
  //   component: PageTwoComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'page-5',
  //   component: PageTwoComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
