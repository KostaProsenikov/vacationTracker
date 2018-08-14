import { Component, OnInit, OnDestroy, Optional, Input } from '@angular/core';
import { AuthService } from '../../authentication/auth-service/auth-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApprovalService } from '../../services/approval.service';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit, OnDestroy {

  username: string;
  subscription: Subscription;
  approvals = 0;
  subscribe1: Subscription;
  admin: boolean;
  hr:    boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private approvalService: ApprovalService) {}

  ngOnInit() {
    this.authService.currentMessage.subscribe((res) => {
      if (res.length) {
        // console.log('api here', res);
        this.checkRoles();
      }
    });
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // if (this.authService.checkIfLogged()) {
          //  this.username = this.authService.getCurrentUser();
          this.username = localStorage.getItem('username');
          this.checkRoles();
          if (this.admin) {
            if (this.subscribe1) {
              this.subscribe1.unsubscribe();
            }
            this.subscribe1 = this.approvalService.getPendingApprovals().subscribe(
              (res) => this.onSuccessGetApprovals(res),
              (err) => this.onError(err)
            );
          }
        // }
      }
    });
  }

  checkRoles() {
    this.admin    = this.authService.checkIfAdmin();
    this.hr       = this.authService.checkIfHR();
  }

  onSuccessGetApprovals(res) {
    this.approvals = res.length;
  }

  logout() {
    this.authService.logout().subscribe(
      (res) => this.onSuccessLogout(res),
      (err) => this.onError(err)
    );
  }

  onError(err) {
    // console.log('err', err);
  }

  onSuccessLogout(res) {
    // console.log('res', res);
    localStorage.removeItem('authtoken');
    localStorage.removeItem('username');
    localStorage.removeItem('administrator');
    localStorage.removeItem('hr_role');
    this.username = undefined;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscribe1.unsubscribe();
  }

}
