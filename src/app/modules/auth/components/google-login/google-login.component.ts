import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services';

import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
    templateUrl: './google-login.component.html',
    styleUrls: ['./google-login.component.css'],
    selector: 'google-login-btn',
})
export class GoogleLoginButton implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('googleLoginBtn') googleLoginButton!: ElementRef;
    scopes: String[] = [''];

    constructor(
        private authService: AuthenticationService,
    ) {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        console.log(this.googleLoginButton);
        this.initGoogleAuthentication();
    }

    ngOnDestroy(): void {

    }

    handleGoogleSingIn(response: any) {
        console.log(response);
        this.authService.signInWithGoogle(response)
            .subscribe((data) => console.log);
    }

    initGoogleAuthentication() {
        google.accounts.id.initialize({
            client_id: '661603811822-udfrl0ijsqtpsplnhdmi2jr8nsgfob0a.apps.googleusercontent.com',
            callback: (response: any) => {
                this.handleGoogleSingIn(response);
            },
        });

        google.accounts.id.renderButton(
            document.getElementById('googleLoginBtn'),
            {
                size: 'large',
                type: 'standard',
                theme: 'filled_black',
                shape: 'pill'
            },
        );
    }

}