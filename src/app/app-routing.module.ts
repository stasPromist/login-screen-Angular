import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirebaseComponent } from './components/firebase/firebase.component';
import { LoginComponent } from './components/login/login.component';
import { IfUserLogin } from './services/auth-guard.service';

const routes: Routes = [
{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{path: 'dashboard', component: DashboardComponent,canActivate:[IfUserLogin]},
{path: 'login', component: LoginComponent},  
{path: 'testdb', component: FirebaseComponent},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
