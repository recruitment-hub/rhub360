import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { DashboardComponent } from './recruiterhome/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: './recruiterhome/recruiterhome.module#RecruiterhomeModule'
      }]
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
