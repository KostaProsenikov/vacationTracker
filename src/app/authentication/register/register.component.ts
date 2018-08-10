import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;

  constructor() {
    this.model = new RegisterModel('', '', '', '', '', 18);
  }

  ngOnInit() {
  }

  register() {
    console.log('form', this.model);
  }

  get diagnostics() {
    return JSON.stringify(this.model);
  }

}
