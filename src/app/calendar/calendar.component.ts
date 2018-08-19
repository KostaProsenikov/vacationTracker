import { VacationModel } from './../models/vacation.model';
import { UserModel } from './../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import * as _moment from 'moment';
import { isSameDay, isSameMonth } from 'date-fns';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { Subject } from 'rxjs';
import { UsersService } from '../services/users.service';
import { VacationService } from '../services/vacation.service';

const moment = _moment;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  usersArray: any[] = [];

  constructor(private modal: NgbModal,
              private userService: UsersService,
              private vacationService: VacationService) { }

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view = 'month';

    modalData: {
      action: string;
      event: CalendarEvent<any>;
    };

    activeDayIsOpen = false;
    @Input() viewDate = new Date();
    @Input() events: CalendarEvent[] = [];

    actions: CalendarEventAction[] = [
      {
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        }
      },
      {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.handleEvent('Deleted', event);
        }
      }
    ];

    refresh: Subject<any> = new Subject();

    ngOnInit() {
      this.userService.getUsers().subscribe(
        (res) => this.onSuccessGetUsers(res),
        (err) => this.onError(err)
      );
    }

    onSuccessGetAllVacations(res) {
        // console.log('res', res);
        this.events = [];
        for (let index = 0; index < res.length; index++) {
          const vacation: VacationModel = res[index];
          const user = this.searchForUserId(vacation.createdBy);
          const eventObj = {
            start: new Date(moment(vacation.startDate).toDate()),
            end:   new Date(moment(vacation.endDate).toDate()),
            title: `${user.fullName}: ${vacation.daysTaken} days - `
            + `from ${moment(vacation.startDate).format('DD.MM.YYYY')} to `
            + `${moment(vacation.endDate).format('DD.MM.YYYY')} - ${vacation.reason}`,
            color: user.color
          };
          this.events.push(eventObj);
        }
        // console.log('event', this.events);
    }

    searchForUserId(userId: string) {
       return this.usersArray.find(user => user.id === userId);
    }

    onSuccessGetUsers(res) {
      if (res.length) {
        this.usersArray = [];
        for (let index = 0; index < res.length; index++) {
          const user = res[index];
          let userObj = {};
          if (user.color) {
            userObj = { id: user._id, fullName: `${user.firstName} ${user.lastName}`, color: JSON.parse(user.color)};
          } else {
            userObj = { id: user._id , fullName: `${user.firstName} ${user.lastName}`, color: { primary: '#1D4EDB'}};
          }
          this.usersArray.push(userObj);
        }
        // console.log('user', this.usersArray);
      }
      this.vacationService.getAllApprovedVacations().subscribe(
        (result) => this.onSuccessGetAllVacations(result),
        (err) => this.onError(err)
      );
    }

    onError(err) {
      console.log('error', err);
    }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
