import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../../services/approval.service';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { VacationModel } from '../../../models/vacation.model';
import { ApprovalModel } from '../../../models/approval.model';
import { ToastrService } from 'ngx-toastr';
const moment = _moment;

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals-component.html',
  styleUrls: ['./approvals-component.css']
})
export class ApprovalsComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['startDate', 'endDate', 'fullName', 'daysTaken', 'isApproved', 'reason', 'approval'];
  awaitingApprovals = [];
  username: string;


  constructor(private approvalService: ApprovalService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getAwaitingApprovals();
  }

  getAwaitingApprovals() {
    this.approvalService.getPendingApprovals().subscribe(
      (res) => this.onSuccessGetApprovals(res),
      (err) => this.onError(err)
    );
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSuccessGetApprovals(res) {
  //  console.log('res', res);
    this.awaitingApprovals = [];
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

  approveRejectVacation(element: VacationModel, varBool: boolean) {
    // console.log('el', element, varBool);
    if (varBool === true) {
      element.isApproved = true;
    } else {
      element.isApproved = false;
    }
    element.approvedBy = this.username;
    this.approvalService.changeActiveVacationRequest(element).subscribe(
      (res: VacationModel) => {
        // console.log('res', res);
        this.getAwaitingApprovals();
        const status = element.isApproved ? 'Approved' : 'Rejected';
        const approvalObj: ApprovalModel = { _id: null, vacationId: res._id, status: status, updatedBy: this.username };
        this.approvalService.addApprovalRecord(approvalObj).subscribe(
          (result) => {
            this.toastr.success(`Successfully ${status.toLowerCase()} the vacation`, 'Success!');
          },
          (err) => this.onError(err)
        );
      },
      (err) => this.onError(err)
    );
  }


  onError(err) {
    console.log('err', err);
    this.toastr.error(`Something got wrong, please try again!`, 'Error!');
  }

}
