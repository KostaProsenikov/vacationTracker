import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentAuthToken: string;

  constructor(private http: HttpClient) { }
  APPKEY        = 'kid_SyM0pR9rm';
  APP_SECRET    = '9de57fd6deaa4665a137f24199906832';
  REGISTER_URL  = `https://baas.kinvey.com/user/${this.APPKEY}`;
  LOGIN_URL     = `https://baas.kinvey.com/user/${this.APPKEY}/login`;
  LOGOUT_URL    = `https://baas.kinvey.com/user/${this.APPKEY}/_logout`;
  ROLES_URL     = `https://baas.kinvey.com/user/${this.APPKEY}/`;

  login(model: LoginModel) {
    return this.http.post(this.LOGIN_URL, 
      JSON.stringify(model),
      {
        headers: this.createAuthHeaders('Basic')
      });
  }

  register(model: RegisterModel) {
    return this.http.post(this.REGISTER_URL, 
      JSON.stringify(model),
    {
      headers: this.createAuthHeaders('Basic')
    });
  }

  logout() {
    return this.http.post(this.LOGOUT_URL, {},
    {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  get authtoken() {
    return this.currentAuthToken;
  }

  getCurrentUser(): string {
    if(localStorage.getItem('username') && localStorage.getItem('authtoken')){
      return localStorage.getItem('username');
    } else {
      return undefined;
    }
  }

  getUserRoles(id: number) {
    return this.http.get(this.ROLES_URL + id + '/roles',
    {
      headers: this.createAuthHeaders('Roles')
    });
  }

  set authtoken(value: string) {
    this.currentAuthToken = value;
  }

  checkIfLogged(): boolean {
    // console.log('this', this.currentAuthToken, localStorage.getItem('authtoken'));
    return this.currentAuthToken === localStorage.getItem('authtoken');
  }

  checkIfHR(): boolean {
    if (localStorage.getItem('hr_role') === '50fa1b47-68ff-4ecb-b654-d8466620abd6'){
        return true;
    } 
    return false;
  }

  checkIfAdmin(): boolean {
    if (localStorage.getItem('administrator') === 'd3ecb240-cfad-4039-aad1-18ed7b11b721'){
        return true;
    } 
    return false;
  }


  private createAuthHeaders(type: string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${this.APPKEY}:${this.APP_SECRET}`)}`,
        'Content-Type': 'application/json'
      })
    } else if (type === 'Roles') {
      return new HttpHeaders({
        'Authorization': "Basic a2lkX1N5TTBwUjlybTo4MDI5YWUxZDVmZjI0ZTlkYWZiYWI3NmFhNzNlN2QxYg==",
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}
