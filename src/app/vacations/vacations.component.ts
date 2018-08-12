import { Component, OnInit, Input } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import * as _moment from 'moment';
import { MatTableDataSource } from '../../../node_modules/@angular/material/table';
const moment = _moment;

// const ELEMENT_DATA: VacationModel[] = [];

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  vacationsArray    = [];
  id                = localStorage.getItem('id');
  previousVacations = [];
  nextVacations     = [];
  displayedColumns  = ['startDate', 'endDate', 'daysTaken', 'isApproved', 'reason'];
  dataSource        = new MatTableDataSource();
  dataSource1       = new MatTableDataSource();

  @Input() set refreshVacations(refreshVacations: string) {
    if (refreshVacations) {
      this.getAllVacations();
    }
  }
  
  constructor(private vacationService: VacationService) { }

  ngOnInit() {
      this.getAllVacations();
  }

  getAllVacations() {
    this.vacationService.getAllVacations(this.id).subscribe(
      (res) => this.onSuccessGetVacations(res),
      (err) => this.onError(err)
    )
  }

  applyFilter(filterValue: string, dataSource) {
    if (dataSource === 'dataSource1') {
      this.dataSource1.filter = filterValue.trim().toLowerCase();
      console.log('data', this.dataSource1.filter);
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log('there', this.dataSource.filter);
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
       const startDate = moment(element.startDate);
       const today     = moment(Date.now());
       const startDateFormatted = moment(element.startDate).format('DD.MM.YYYY');
       const endDateFormatted   = moment(element.endDate)  .format('DD.MM.YYYY');
       element.startDate = startDateFormatted;
       element.endDate   = endDateFormatted;
       let daysDiff  = startDate.diff(today, 'days');
       if (daysDiff <= 0) {
         this.previousVacations.push(element);
       } else {
         this.nextVacations.push(element);
       }
     }
     this.dataSource   = new MatTableDataSource(this.previousVacations);
     this.dataSource1  = new MatTableDataSource(this.nextVacations);
  }

  onError(err): any {
    console.log('err', err);
  }

}
