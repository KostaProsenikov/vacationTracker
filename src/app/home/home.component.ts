import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { UserModel } from '../models/user.model';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyDateAdapter } from '../adapters/date_adapter';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  vacationForm: FormGroup;
  user:         UserModel;
  color     = 'primary';
  mode      = 'indeterminate';
  minDate   = new Date(Date.now());
  minDate1  = new Date(Date.now());
  id        = localStorage.getItem('id');
  errorMsg:       string;
  daysTaken:      number;
  refreshTrigger: string;
  observable1:    Subscription;

  constructor(private vacationService: VacationService,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef) 
  { }

  ngOnInit() {
    this.vacationFormInitialize();
    this.getVacationDays();
    this.onChanges();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
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
      daysTaken: new FormControl({value: 0,  disabled: true })
    });
    // console.log('this vacation', this.vacationForm);
  }

  onChanges() {
    this.observable1 = this.vacationForm.valueChanges.subscribe( (val) => {
      const date     = moment(val['startDate']);
      if (val['startDate'] !== '') {
        this.minDate1  = new Date(moment.utc(date).toDate());
      } else {
        this.minDate1 =  new Date(Date.now());
      }
      // console.log('date', date);
      // console.log('minDae', this.minDate1);
      if (val['startDate'] !== '' && val['endDate'] !== '') {
        const startDate  = moment(val['startDate']);
        const endDate    = moment(val['endDate']);
        let   daysDiff   = startDate.diff(endDate.add(1, 'days'), 'days');
        if (daysDiff > 0) {
          this.errorMsg = 'You cannot request days in the past!';
        } else {
          this.errorMsg = '';
          this.daysTaken = Math.abs(daysDiff);
        }
      }
    });
  }

  reinitializeDates() {
    this.minDate   = new Date(Date.now());
    this.minDate1  = new Date(Date.now());
  }

  onSubmit(form) {
    for (let index = moment(form.startDate); index <= moment(form.endDate); index.add(1, 'days')) {
      const currentDay = index;
      // Remove Saturday and Sunday from counter of days
      if (currentDay.day() === 6 || currentDay.day() === 0) {
        this.daysTaken--;
      }
    }

    form.daysTaken   = this.daysTaken;
    form.createdBy   = this.id;
    form.isApproved  = false;
    form.isCancelled = false;
    form.approvedBy  = '';

    this.vacationService.requestVacation(form).subscribe(
      (res) => this.onSuccessRequestVacation(res),
      (err) => this.onError(err)
    );
  }

  onSuccessRequestVacation(res): any {
    // console.log('res', res);
     const id            = localStorage.getItem('id');
     const daysLeft      = this.user.daysLeft - Number(res.daysTaken);
     this.refreshTrigger = daysLeft.toString();
     this.reinitializeDates();
     this.vacationFormInitialize();
     this.onChanges();
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

  ngOnDestroy() {
    this.observable1.unsubscribe();
  }
}
