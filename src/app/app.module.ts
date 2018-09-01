import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { HighLightDirective } from './directives/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NavComponentComponent } from './nav/nav-component/nav-component.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './authentication/auth-service/auth-service.service';
import { MatButtonModule, MatCheckboxModule, MatBadgeModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { DisableControlDirective } from './directives/disableControl.directive';
import { MatTableModule } from '@angular/material/table';
import { VacationsComponent, DialogOverviewExampleDialog } from './vacations/vacations.component';
import { MatDialogModule } from '@angular/material';
import { ApprovalsComponent } from './approvals/approvals-component/approvals-component';
import { UsersComponent } from './users/users.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
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
      positionClass: 'toast-top-center',
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
