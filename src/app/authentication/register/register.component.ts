import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { AuthService } from '../auth-service/auth-service.service';
import { Router } from '@angular/router';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  loginFailed: boolean;
  err: string;

  constructor(private authService: AuthService,
              private router: Router) {
    this.model = new RegisterModel('', '', '', '', '', 18, 0, '#F39347');
  }

  ngOnInit() {

  }

  register() {
    delete this.model['confirmPassword'];
    const now = moment(new Date());
    const end = moment('2018-12-31');
    const duration = moment.duration(now.diff(end));
    const months = Math.abs(duration.asMonths());
    const daysLeft = Math.round(1.66 * Math.floor(months));
    this.model.daysLeft = daysLeft;
    // console.log('this,', this.model);
    this.authService.register(this.model).subscribe(
      (res) => this.onSuccessRegisterUser(res),
      (err) => this.onError(err)
    );
  }

  onSuccessRegisterUser(res) {
    // console.log('res', res);
    this.router.navigate(['/login']);
  }

  onColorChange($event) {
      console.log('edv', $event);
  }

  onError(err) {
    // console.log('err', err);
    this.loginFailed = true;
    this.err = err;
  }

  get diagnostics() {
    return JSON.stringify(this.model);
  }

}
