import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as _moment from 'moment';
import { VacationModel } from '../models/vacation.model';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  APPKEY           = 'kid_SyM0pR9rm';
  APP_SECRET       = '9de57fd6deaa4665a137f24199906832';
  VACATIONS_URL    = `https://baas.kinvey.com/appdata/${this.APPKEY}/vacations/`;
  APPROVALS_URL    = `https://baas.kinvey.com/appdata/${this.APPKEY}/approvals/`;

  constructor(private http: HttpClient) { }

  getPendingApprovals() {
    const today = moment(Date.now()).format('YYYY-MM-DD');
    return this.http.get(this.VACATIONS_URL + 
      `?query={"isCancelled": false, "isApproved": null, "startDate": {\"$gte\": \"${today}\"}}&sort={"startDate": 1}`,
    {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  addApprovalRecord(approvalObj) {
    return this.http.post(this.APPROVALS_URL,
      JSON.stringify(approvalObj),
    {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  changeActiveVacationRequest(vacationReq: VacationModel) {
    return this.http.put(this.VACATIONS_URL + vacationReq._id, 
      JSON.stringify(vacationReq),
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
