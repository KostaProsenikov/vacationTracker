import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import * as _moment from 'moment';
import { UserModel } from '../models/user.model';
const moment = _moment;


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  APPKEY           = 'kid_SyM0pR9rm';
  APP_SECRET       = '9de57fd6deaa4665a137f24199906832';
  USERS_URL        = `https://baas.kinvey.com/user/${this.APPKEY}/`;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.USERS_URL,
    {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  updateUser(user: UserModel) {
    return this.http.put(this.USERS_URL + user._id,
      JSON.stringify(user),
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  
  private createAuthHeaders(type: string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${this.APPKEY}:${this.APP_SECRET}`)}`,
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
