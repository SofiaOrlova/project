import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {RegisterModel} from "../models/register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, Validators.required),
  });

  public get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  public get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public signup(): void {
    let model = new RegisterModel();
    model.name = this.name.value;
    model.email = this.email.value;
    model.password = this.password.value;
    this.authService.signup(model).subscribe(
      result => {
        this.router.navigate(['/auth/login']);
      }
    );
  }
}
