import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../authentication/auth-service/auth-service.service';
import { Router, NavigationEnd } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit, OnDestroy {

  username: string;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) 
  {

  }
  
  ngOnInit() {
    this.subscription =this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.username = this.authService.getCurrentUser();
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(
      (res) => this.onSuccessLogout(res),
      (err) => this.onError(err)
    )
  }

  onError(err) {
    // console.log('err', err);
  }

  onSuccessLogout(res) {
    // console.log('res', res);
    localStorage.removeItem('authtoken');
    localStorage.removeItem('username');
    this.username = undefined;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
