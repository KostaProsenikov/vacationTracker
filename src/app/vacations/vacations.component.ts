import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialogData';
import { VacationModel } from '../models/vacation.model';
import * as _moment from 'moment';
const moment = _moment;

// const ELEMENT_DATA: VacationModel[] = [];

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  id                    = localStorage.getItem('id');
  vacationsArray        = [];
  previousVacations     = [];
  nextVacations         = [];
  displayedColumns      = ['startDate', 'endDate', 'daysTaken', 'isApproved', 'approvedBy', 'reason', 'cancellation'];
  displayedColumnsPrev  = ['startDate', 'endDate', 'daysTaken', 'isApproved', 'approvedBy', 'reason'];
  dataSource            = new MatTableDataSource();
  dataSource1           = new MatTableDataSource();

  @Input() set refreshVacations(refreshVacations: string) {
    if (refreshVacations) {
      this.getAllVacations();
    }
  }

  constructor(private vacationService: VacationService,
              private dialog: MatDialog) { }

  ngOnInit() {
      this.getAllVacations();
  }

  getAllVacations() {
    this.vacationService.getAllVacations(this.id).subscribe(
      (res) => this.onSuccessGetVacations(res),
      (err) => this.onError(err)
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: element
    });

    dialogRef.afterClosed().subscribe( (result: VacationModel)  => {
      if (result) {
        result.isCancelled = true;
        const copiedResult = Object.assign({}, result);
        delete copiedResult['startDateFormatted'];
        delete copiedResult['endDateFormatted'];
        // console.log('here', copiedResult);
        this.vacationService.cancelVacation(copiedResult).subscribe((res) => {
          this.onSuccessCancelVacation(res),
          // tslint:disable-next-line:no-unused-expression
          (err) => this.onError(err);
        });
      }
    });
  }

  onSuccessCancelVacation(res) {
    const daysTaken = res.daysTaken;
    this.vacationService.getVacationDays(this.id).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (res) => this.onSuccessGetDaysLeft(res, daysTaken),
      (err) => this.onError(err)
    );
  }

  onSuccessGetDaysLeft(res, daysTaken: number) {
    // console.log('beforeDays', res);
    const user = res;
    user.daysLeft = Number(user.daysLeft) + daysTaken;
    this.vacationService.setVacationDays(user).subscribe(
      (result) => this.onSuccessSetDays(result),
      (err) => this.onError(err)
    );
  }

  onSuccessSetDays(res) {
    // console.log('resultDays', res);
  }


  applyFilter(filterValue: string, dataSource) {
    if (dataSource === 'dataSource1') {
      this.dataSource1.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onSuccessGetVacations(res): any {
    //  console.log('res', res);
     this.vacationsArray = res;
     this.nextVacations = [];
     this.previousVacations = [];
     for (let index = 0; index < this.vacationsArray.length; index++) {

       const element = this.vacationsArray[index];
      //  console.log('el', element);
      if (element.startDate) {
        const startDate = moment(element.startDate);
        const today     = moment(Date.now());
        const startDateFormatted = moment(element.startDate).format('DD.MM.YYYY');
        const endDateFormatted   = moment(element.endDate)  .format('DD.MM.YYYY');
        element.startDateFormatted = startDateFormatted;
        element.endDateFormatted   = endDateFormatted;
        const daysDiff  = startDate.diff(today, 'days');
        if (daysDiff <= 0) {
          this.previousVacations.push(element);
        } else {
          this.nextVacations.push(element);
        }
      }
     }
     const prevVacationsReversed = this.previousVacations.reverse();
     this.dataSource   = new MatTableDataSource(prevVacationsReversed);
     this.dataSource1  = new MatTableDataSource(this.nextVacations);
  }

  onError(err): any {
    console.log('err', err);
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector:    'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls:   ['./vacations.component.css']
})

// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
