
// Angular Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { NavComponentComponent } from './components/nav/nav-component/nav-component.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { VacationsComponent, DialogOverviewExampleDialog } from './components/vacations/vacations.component';
import { ApprovalsComponent } from './components/approvals/approvals-component/approvals-component';
import { UsersComponent } from './components/users/users.component';
import { CalendarComponent } from './components/calendar/calendar.component';

// Routing
import { AppRoutingModule } from './app.routing';

// Services
import { AuthService } from './components/authentication/auth-service/auth-service.service';

// Directives And Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HighLightDirective } from './directives/highlight.directive';
import { DisableControlDirective } from './directives/disableControl.directive';

// Material design
import { MatButtonModule, MatCheckboxModule, MatBadgeModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';

// Other
import { CalendarModule } from 'angular-calendar';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HighLightDirective,
    DisableControlDirective,
    CapitalizePipe,
    NavComponentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VacationsComponent,
    DialogOverviewExampleDialog,
    ApprovalsComponent,
    UsersComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    ColorPickerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [ DialogOverviewExampleDialog ],
  providers: [ AuthService, MatNativeDateModule, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}} ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
