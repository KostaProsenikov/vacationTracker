import { Component, OnInit } from '@angular/core';
import { Title } from '../../../node_modules/@angular/platform-browser';
import { VacationService } from '../services/vacation.service';
import { UserModel } from '../models/user.model';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyDateAdapter } from '../adapters/date_adapter';
const moment = _moment;

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
  vacationForm: FormGroup;
  user: UserModel;
  color    = 'primary';
  mode     = 'indeterminate';
  minDate   = new Date(Date.now());
  minDate1  = new Date(Date.now());
  id       = localStorage.getItem('id');
  errorMsg:       string;
  daysTaken:      number;
  refreshTrigger: string;

  constructor(private vacationService: VacationService,
              private formBuilder: FormBuilder) 
  { }

  ngOnInit() {
    this.vacationFormInitialize();
    this.getVacationDays();
    this.onChanges();
  }

  getVacationDays() {
    const id = localStorage.getItem('id');
    this.vacationService.getVacationDays(id).subscribe(
      (res) => this.onSuccess(res),
      (err) => this.onError(err)
    );
  }

  vacationFormInitialize() {
    this.vacationForm = this.formBuilder.group({
      startDate: new FormControl({value: '', disabled: true }, [Validators.required]),
      endDate:   new FormControl({value: '', disabled: true }, [Validators.required]),
      daysTaken: new FormControl({value: 0, disabled: true })
    });
  }

  onChanges() {
    this.vacationForm.valueChanges.subscribe( (val) => {
      const date = moment(val['startDate']);
      this.minDate1 = new Date(moment.utc(date).toDate());

      console.log('date', this.minDate1);
      if (val['startDate'] && val['endDate']) {
         const startDate = moment(val['startDate']);
         const endDate   = moment(val['endDate']);
         let daysDiff  = startDate.diff(endDate, 'days');
         if (daysDiff > 0) {
           this.errorMsg = 'You cannot request days in the past!';
         } else {
           this.errorMsg = '';
           this.daysTaken = Math.abs(daysDiff);
         }
      }
    });
  }

  onSubmit(form) {
    form.daysTaken   = this.daysTaken;
    form.createdBy   = this.id;
    form.isApproved  = false;
    form.isCancelled = false;
    form.approvedBy  = '';
    // console.log('form', form);
    this.vacationService.requestVacation(form).subscribe(
      (res) => this.onSuccessRequestVacation(res),
      (err) => this.onError(err)
    );
  }

  onSuccessRequestVacation(res): any {
     const id = localStorage.getItem('id');
     const daysLeft = this.user.daysLeft - this.daysTaken;
     this.refreshTrigger = daysLeft.toString();
     this.vacationFormInitialize();
     this.vacationService.setVacationDays(id, daysLeft).subscribe(
      (res) => this.onSuccessSetDays(res),
      (err) => this.onError(err)
    );
  }

  onSuccessSetDays(res) {
    this.user = res;
  }

  onSuccess(res) {
    this.user = res;
  }

  onError(err) {
    console.log('err', err);
  }

}
