// Angular Core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { ApprovalsComponent } from './components/approvals/approvals-component/approvals-component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    { path: '',              pathMatch: 'full', redirectTo: 'home'},
    { path: 'home',          component: HomeComponent, canActivate: [ AuthGuard ] },
    // { path: 'home',          component: HomeComponent, canActivate: [ ] },
    { path: 'login',         component: LoginComponent },
    { path: 'register',      component: RegisterComponent },
    { path: 'vacations',     component: VacationsComponent, canActivate: [ AuthGuard ] },
    { path: 'approvals',     component: ApprovalsComponent, canActivate: [ AuthGuard ] },
    { path: 'users',         component: UsersComponent,     canActivate: [ AuthGuard ] },
    { path: 'team-calendar', component: CalendarComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
