import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('test@email.ru', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('test-password', Validators.required),
  });

  public get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  public isLoginFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public login(): void {
    let model = new LoginModel();
    model.email = this.email.value;
    model.password = this.password.value;
    this.authService.login(model).subscribe(
      result => {
        this.router.navigate(['/page-1']);
      },
      error => {
        this.isLoginFailed = true;
      }
    );
  }
}
