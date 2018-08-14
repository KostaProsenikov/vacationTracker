import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { VacationsComponent } from './vacations/vacations.component';
import { ApprovalsComponent } from './approvals/approvals-component/approvals-component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: '',         pathMatch: 'full', redirectTo: 'home'},
    // { path: 'home',     component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'home',      component: HomeComponent, canActivate: [ ] },
    { path: 'login',     component: LoginComponent },
    { path: 'register',  component: RegisterComponent },
    { path: 'vacations', component: VacationsComponent },
    { path: 'approvals', component: ApprovalsComponent },
    { path: 'users',     component: UsersComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
