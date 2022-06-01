import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatChipsModule } from '@angular/material/chips';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AvatarModule } from 'ngx-avatar';

import { MentorDashboardGraphsComponent } from './mentor-dashboard-graphs/mentor-dashboard-graphs.component';
import { BatchEmployeeDetailsComponent } from './batch-employee-details/batch-employee-details.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EmployeegraphComponent } from './employeegraph/employeegraph.component';
import {MatCardModule} from '@angular/material/card';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    MentorDashboardComponent,
    EmployeeDashboardComponent,
    MentorDashboardGraphsComponent,
    BatchEmployeeDetailsComponent,
    EmployeeRegistrationComponent,
    EmployeegraphComponent,
    EmployeeRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ScrollingModule,
    DragDropModule,
    DemoNgZorroAntdModule,
    Ng2SearchPipeModule,
    MatChipsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
