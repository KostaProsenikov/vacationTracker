import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res: Array<any>) => {
        console.log('res', res);
        this.users = res;
      },
      (err) => this.onError(err)
    )
  }

  onError(err) {
    console.log('err', err);
  }

}
