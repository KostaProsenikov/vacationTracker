import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals-component.html',
  styleUrls: ['./approvals-component.css']
})
export class ApprovalsComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['startDate', 'endDate', 'daysTaken', 'isApproved', 'approvedBy', 'reason', 'cancellation'];
  awaitingApprovals = [];


  constructor(private approvalService: ApprovalService) { }

  ngOnInit() {
    this.approvalService.getPendingApprovals().subscribe(
      (res) => this.onSuccessGetApprovals(res),
      (err) => this.onError(err)
    );
  }

  onSuccessGetApprovals(res) {
  //  console.log('res', res);
    for (let index = 0; index < res.length; index++) { 
      const element = res[index];
      if (element.startDate) {
        const startDateFormatted = moment(element.startDate).format('DD.MM.YYYY');
        const endDateFormatted   = moment(element.endDate)  .format('DD.MM.YYYY');
        element.startDateFormatted = startDateFormatted;
        element.endDateFormatted   = endDateFormatted;
          this.awaitingApprovals.push(element);
      }
    }
    this.dataSource  = new MatTableDataSource(this.awaitingApprovals);
  }
  onError(err) {
    console.log('err', err);
  }

}
