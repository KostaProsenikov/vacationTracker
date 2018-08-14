import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VacationModel } from '../models/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  APPKEY           = 'kid_SyM0pR9rm';
  APP_SECRET       = '9de57fd6deaa4665a137f24199906832';
  VACATIONDAYS_URL = `https://baas.kinvey.com/user/${this.APPKEY}/`;
  VACATIONS_URL    = `https://baas.kinvey.com/appdata/${this.APPKEY}/vacations/`;

  constructor(private http: HttpClient) { }

  getVacationDays(id) {
    return this.http.get(this.VACATIONDAYS_URL + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  getAllVacations(id) {
    return this.http.get(this.VACATIONS_URL + `?query={"createdBy": "${id}"}&sort={"startDate": 1}`,
    {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  cancelVacation(vacationObj: VacationModel) {
    return this.http.put(this.VACATIONS_URL + vacationObj._id,
      JSON.stringify(vacationObj),
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  setVacationDays(id, daysLeft: number) {
    const form = {'daysLeft': daysLeft};
    return this.http.put (this.VACATIONDAYS_URL + id,
      JSON.stringify(form),
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  requestVacation(form: VacationModel) {
    return this.http.post(this.VACATIONS_URL, JSON.stringify(form),
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${this.APPKEY}:${this.APP_SECRET}`)}`,
        'Content-Type': 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      });
    }
  }
}
