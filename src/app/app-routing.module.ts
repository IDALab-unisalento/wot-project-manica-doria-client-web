import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListMaintenanceComponent } from './components/home/children/list-maintenance/list-maintenance.component';
import { MaintenanceComponent } from './components/home/children/maintenance/maintenance.component';
import { OperatorComponent } from './components/home/children/operator/operator.component';
import { MachineComponent } from './components/home/children/machine/machine.component';
import { BeaconComponent } from './components/home/children/beacon/beacon.component';
import { DashboardComponent } from './components/home/children/dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'beacon', component: BeaconComponent },
      { path: 'machine', component: MachineComponent },
      { path: 'operator', component: OperatorComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-maintenance', component: ListMaintenanceComponent },
    ],
    // canActivate: [AuthGuardService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
