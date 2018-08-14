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
    this.authService.getUserRoles(res['_id']).subscribe(
      (res) => this.onSuccessGetRoles(res),
      (err) => this.onError(err));
    this.authService.authtoken = res['_kmd']['authtoken'];
    localStorage.setItem('authtoken', res['_kmd']['authtoken']);
    localStorage.setItem('username', res['username']);
    localStorage.setItem('id', res['_id'])
    this.router.navigate(['']);
  }

  onSuccessGetRoles(res) {
    console.log('res', res);
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      // Admins Role
      if (element.roleId === 'd3ecb240-cfad-4039-aad1-18ed7b11b721') {
        localStorage.setItem('administrator', 'd3ecb240-cfad-4039-aad1-18ed7b11b721');
      } 
      // HRs Role
      else if (element.roleId === '50fa1b47-68ff-4ecb-b654-d8466620abd6') {
        localStorage.setItem('hr_role', '50fa1b47-68ff-4ecb-b654-d8466620abd6');
      }
    }
  }
  
  onError(err) {
    // console.log('err', err);
    this.loginFailed = true;
    this.err = err;
  }

}
