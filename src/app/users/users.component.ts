import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  displayedColumns = ['firstName', 'lastName', 'username', 'email', 'age', 'daysLeft'];
  dataSource       = new MatTableDataSource();
  vacationDaysForm: FormGroup;

  constructor(private userService: UsersService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAllUsers();
    this.vacationDaysFormInit();
  }

  vacationDaysFormInit() {
    this.vacationDaysForm = this.formBuilder.group({
      daysLeft:    0,
    })
  }

  valueChange($event, element: UserModel) {
    const newDays = Number($event.target.value);
    console.log('evv', newDays , element);
    element.daysLeft = newDays;
    const userUpdated = element;
    this.userService.updateUser(userUpdated).subscribe(
      (res) => this.onUpdatedUser(res),
      (err) => this.onError(err)
    )
  }

  onUpdatedUser(res) {
    console.log('updated', res);
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res: Array<any>) => {
        // console.log('res', res);
        this.users = res;
        this.dataSource   = new MatTableDataSource(this.users);
      },
      (err) => this.onError(err)
    )
  }

  onError(err) {
    console.log('err', err);
  }

}
