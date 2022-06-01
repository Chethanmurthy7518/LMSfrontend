import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { LoginComponent } from './login/login.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path:'empregister',component:EmployeeRegistrationComponent},
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    data: { role: ['admin'] },
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'mentordashboard',
    component: MentorDashboardComponent,
    data: { role: ['mentor'] },
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'employeedashboard',
    component: EmployeeDashboardComponent,
    data: { role: ['employee'] },
    canActivate: [AuthGuardGuard],
  },
  {
    path:'employeerequest',
    component:EmployeeRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
