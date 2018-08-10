import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  username = '';
  password = '';
  repeatPass = '';


  constructor() {
    this.model = new RegisterModel('', '', '', '', '', 18);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('form', this.model);
  }

}
