import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = '/app';
  }

  get f() {
    return this.loginForm.controls;
  }

  signIn() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (v) => this.onLoginSuccess(v),
        error: (e) => this.onLoginFailure(e),
        complete: () => console.log(),
      });
  }

  onLoginSuccess(dataLogin: any) {
    this.router.navigate([this.returnUrl]);
  }

  onLoginFailure(error: any) {
    this.error = error;
    this.loading = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Username/password is incorrect',
    });
  }
}
