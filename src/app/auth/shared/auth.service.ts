import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { SignupRequestPayload } from './../signup/signup-request.payload';
import { LoginRequestPayload } from './../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<String> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.loggedIn.emit(true);
        this.username.emit(data.username);

        this.localStorageService.store('authenticationToken', data.authenticationToken);
        this.localStorageService.store('refreshToken', data.refreshToken);
        this.localStorageService.store('username', data.username);
        this.localStorageService.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  logout() {
    this.http.post("http://localhost:8080/api/auth/logout", this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('expiresAt');
  }

  refreshToken() {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorageService.clear('authenticationToken');
        this.localStorageService.clear('expiresAt');

        this.localStorageService.store('authenticationToken',
          response.authenticationToken);
        this.localStorageService.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorageService.retrieve('authenticationToken');
  }

  getUserName() {
    return this.localStorageService.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorageService.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
