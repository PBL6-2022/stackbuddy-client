import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "src/app/shared/shared.module";
import {  HttpClientModule } from "@angular/common/http";
import { GoogleLoginButton } from "./components/google-login/google-login.component";
import { FacebookLoginButton } from "./components/facebook-login/facebook-login.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        GoogleLoginButton,
        FacebookLoginButton,
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: []
})
export class AuthModule { }