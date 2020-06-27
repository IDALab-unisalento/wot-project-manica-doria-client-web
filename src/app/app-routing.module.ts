import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {BeaconComponent} from './components/home/beacon/beacon.component';
import {MachineComponent} from './components/home/machine/machine.component';
import {OperatorComponent} from './components/home/operator/operator.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'home', component: HomeComponent,
    //canActivate: [AuthGuardService]
  },
  {path: 'beacon', component: BeaconComponent},
  {path: 'machine', component: MachineComponent},
  {path: 'operator', component: OperatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
