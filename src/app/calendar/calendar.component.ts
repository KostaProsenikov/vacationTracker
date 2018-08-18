import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import * as _moment from 'moment';
import { isSameDay, isSameMonth } from 'date-fns';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { Subject } from 'rxjs';

const moment = _moment;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';

  modalData: {
    action: string;
    event: CalendarEvent<any>;
  };

  activeDayIsOpen = false;
  @Input() viewDate = new Date();
  @Input() events: CalendarEvent[] = [
    {
      start: new Date(moment().toDate()),
      end:   new Date(moment().add(1, 'days').toDate()),
      title: 'Vacation',
      color: colors.red
    },
    {
      start: new Date(moment().toDate()),
      end:   new Date(moment().add(2, 'days').toDate()),
      title: 'Mimi Trip to Athens',
      color: colors.blue
    }
  ];

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
