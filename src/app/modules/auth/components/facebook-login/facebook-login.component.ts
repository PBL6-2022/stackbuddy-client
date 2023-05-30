import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

import { AuthenticationService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { P } from '@angular/cdk/keycodes';

declare var FB: any;

@Component({
    templateUrl: './facebook-login.component.html',
    styleUrls: ['./facebook-login.component.css'],
    selector: 'facebook-login-btn',
})
export class FacebookLoginButton implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    async signInWithFB(): Promise<void> {
        try {
            const facebookUser: SocialUser = await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
            this.authService.signInWithFacebook(facebookUser)
                .subscribe((data) => {
                    console.log({ data });
                })
                .unsubscribe();
        } catch (Error) {
            console.log(Error);
        }
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

}