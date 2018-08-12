import { Component, OnInit, Input } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  vacationsArray = [];
  id             = localStorage.getItem('id');
  previousVacations = [];
  nextVacations     = [];

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
       let daysDiff  = startDate.diff(today, 'days');
       if (daysDiff <= 0) {
         this.previousVacations.push(element);
       } else {
         this.nextVacations.push(element);
       }
     }
  }

  onError(err): any {
    console.log('err', err);
  }

}
