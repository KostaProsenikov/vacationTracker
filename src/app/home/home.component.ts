import { Component, OnInit } from '@angular/core';
import { Title } from '../../../node_modules/@angular/platform-browser';
import { VacationService } from '../services/vacation.service';
import { UserModel } from '../models/user.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { MyDateAdapter } from '../adapters/date_adapter';

const moment = _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class HomeComponent implements OnInit {
  user: UserModel;
  color = 'primary';
  mode  = 'indeterminate';
  startDate = new FormControl(moment());
  endDate   = new FormControl(moment());

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    const id = localStorage.getItem('id');
    this.vacationService.getVacationDays(id).subscribe(
      (res) => this.onSuccess(res),
      (err) => this.onError(err)
    )
  }

  onSuccess(res) {
    // console.log('res', res);
    this.user = res;
    console.log('user', this.user);
  }

  onError(err) {
    console.log('err', err);
  }

}
