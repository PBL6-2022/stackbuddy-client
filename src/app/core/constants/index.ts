import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public LocalStorageKey = {
        User: 'user',
        UserRefreshToken: 'auth-refreshtoken',
        UserAccessToken: 'auth-token',
    };
}
