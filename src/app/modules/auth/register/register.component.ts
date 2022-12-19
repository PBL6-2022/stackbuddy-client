import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from 'src/app/core/services';
import { IUser } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    registerSubscription!: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    registerAccount() {
        if (this.registerForm.invalid) {
            return;
        }

        const onSuccess = (d: Record<string, any>) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Register successfully',
            });
            this.registerSubscription?.unsubscribe();
            this.router.navigate(['/auth/login']);
        }

        const onError = (e: any) => {
            this.messageService.add({
                severity: 'error',
                summary: 'An error occurred',
            });
            this.registerSubscription?.unsubscribe();        }

        this.loading = true;
        this.registerSubscription = this.authenticationService
            .register(this.registerForm.value as IUser)
            .pipe(first())
            .subscribe({
                next: (registerData) => {
                    onSuccess(registerData);
                    this.loading = false;
                },
                error: (error) => {
                    onError(error);
                    this.loading = false;
                },
                complete: () => {}
            });
    }
}
