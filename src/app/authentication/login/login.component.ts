import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginModel;
  loginFailed: boolean;
  err: any;
  constructor(private authService: AuthService,
              private router: Router) {
    this.login =  new LoginModel('', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log('login', this.login);
    this.authService.login(this.login).subscribe(
      (res) => this.onSuccessLoginUser(res),
      (err) => this.onError(err)
    )
  }

  onSuccessLoginUser(res) {
    // console.log('res', res);
    this.authService.authtoken = res['_kmd']['authtoken'];
    localStorage.setItem('authtoken', res['_kmd']['authtoken']);
    localStorage.setItem('username', res['username']);
    localStorage.setItem('id', res['_id'])
    this.router.navigate(['']);
  }

  onError(err) {
    // console.log('err', err);
    this.loginFailed = true;
    this.err = err;
  }

}
