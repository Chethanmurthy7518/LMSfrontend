import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
