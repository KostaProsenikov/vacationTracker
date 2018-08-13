import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  APPKEY           = 'kid_SyM0pR9rm';
  APP_SECRET       = '9de57fd6deaa4665a137f24199906832';
  VACATIONS_URL    = `https://baas.kinvey.com/appdata/${this.APPKEY}/vacations/`;


  constructor(private http: HttpClient) { }

  getPendingApprovals() {
    const today = moment(Date.now()).toISOString();
    return this.http.get(this.VACATIONS_URL + 
      `?query{'isApproved' : false, 'isCancelled' : false, 'startDate': {"$gt": "ISODate(\"${today}\")"}}&sort={"startDate": 1}`,
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
