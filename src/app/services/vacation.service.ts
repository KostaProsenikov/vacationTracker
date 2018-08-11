import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  APPKEY           = 'kid_SyM0pR9rm';
  APP_SECRET       = '9de57fd6deaa4665a137f24199906832';
  VACATIONDAYS_URL = `https://baas.kinvey.com/user/${this.APPKEY}/`;

  constructor(private http: HttpClient) { }

  getVacationDays(id) {
    return this.http.get(this.VACATIONDAYS_URL + id,
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
