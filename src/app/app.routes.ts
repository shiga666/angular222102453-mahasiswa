
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { LoginComponent } from './login/login.component'; 
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { MahasiswaComponent } from './mahasiswa/mahasiswa.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" }, 
    { path: "admin", component: AdminComponent },
    { path: "dashboard", component: DashboardComponent }, 
    { path: "dashboard2", component: Dashboard2Component},
    { path: "dashboard3", component: Dashboard3Component},
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent},
    { path: "mahasiswa", component: MahasiswaComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})

export class AppRoutes {}