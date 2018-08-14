import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  displayedColumns = ['firstName', 'lastName', 'username', 'email', 'age', 'daysLeft'];
  dataSource       = new MatTableDataSource();

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getAllUsers();
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
