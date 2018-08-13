import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { AuthService } from '../auth-service/auth-service.service';
import { Router } from '@angular/router';

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
    this.model = new RegisterModel('', '', '', '', '', 18);
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      (res) => this.onSuccessRegisterUser(res),
      (err) => this.onError(err)
    )
  }

  onSuccessRegisterUser(res) {
    // console.log('res', res);
    this.router.navigate(['/login']);
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
