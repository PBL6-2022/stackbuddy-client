import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser, User } from '../models';
import { environment } from '../../../environments/environment';
import { AppConstants } from '../constants';
import { HttpService } from './http.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { throwIfAlreadyLoaded } from '../guards/module-import.guard';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private appConstants: AppConstants,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      this.getUserFromLocalStorage() as User
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserFromLocalStorage(): any {
    let user: Object = {};
    let accessToken = '';
    let refreshToken = '';

    try {
      user = JSON.parse(localStorage.getItem(this.appConstants.LocalStorageKey.User) || '');
      accessToken = localStorage.getItem(this.appConstants.LocalStorageKey.UserAccessToken) || '';
      refreshToken = localStorage.getItem(this.appConstants.LocalStorageKey.UserRefreshToken) || '';

      return {
        accessToken,
        refreshToken,
        ...user,
      };
    } catch (error) {
      return null;
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  initHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('App-Name', environment.appName);
    return headers;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        `${environment.apiGatewaylocal}/api/auth/login/facebook`,
        { username, password },
        {
          headers: this.initHeaders(),
        }
      )
      .pipe(
        map((loginData) => {
          const { data } = loginData;
          const { refreshToken, accessToken, ...userData } = data;

          localStorage.setItem(this.appConstants.LocalStorageKey.User, JSON.stringify(userData));
          localStorage.setItem(this.appConstants.LocalStorageKey.UserAccessToken, accessToken);
          localStorage.setItem(this.appConstants.LocalStorageKey.UserRefreshToken, refreshToken);

          this.currentUserSubject.next(data);
          return data;
        })
      );
  }

  signInWithFacebook(user: SocialUser) {
    return this.http.post(
      `${environment.apiGatewaylocal}/api/auth/login/facebook`,
      {
        facebookUser: user,
      },
    );
  }

  register(user: IUser) {
    const {
      username,
      password,
      email,
      name,
      confirmPassword,
    } = user;

    if (confirmPassword !== password) {
      const error = (new Error('password_does_not_match'));
      return throwError(() => error);
    }

    return this.http.post<any>(
      `${environment.apiGatewayUrl}/api/v1/auth/register`, {
      username,
      password,
      email,
      name,
    }, {
      headers: this.initHeaders(),
    },
    );
  }

  logout() {
    localStorage.removeItem(this.appConstants.LocalStorageKey.User);
    localStorage.removeItem(this.appConstants.LocalStorageKey.UserAccessToken);
    localStorage.removeItem(this.appConstants.LocalStorageKey.UserRefreshToken);
    this.currentUserSubject.next({} as User);
  }

  isSingedIn(): boolean {
    try {
      // const user = JSON.parse(localStorage.getItem(this.appConstants.LocalStorageKey.User) || '');
      // const accessToken = localStorage.getItem(this.appConstants.LocalStorageKey.UserAccessToken);
      // const refreshToken = localStorage.getItem(this.appConstants.LocalStorageKey.UserRefreshToken);

      // if (user && accessToken && refreshToken) {
      //   return true;
      // }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  refreshToken(refreshToken: string) {
    return this.http.post(
      `${environment.apiGatewayUrl}/api/v1/auth/refresh-token`, {
      refreshToken,
    },
      httpOptions
    );
  }

  signInWithGoogle(data: any) {
    const loginWithGoogleUrl = `${environment.apiGatewayUrl}/api/auth/login/google`;
    return this.httpService.post({
      url: loginWithGoogleUrl,
      data,
    })
      .pipe(map(
        response => {
          const dataResponse = response as any;
          return dataResponse && dataResponse.data;
        }
      ));
  }
}
