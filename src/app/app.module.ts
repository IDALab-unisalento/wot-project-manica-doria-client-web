import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaintenanceService} from './services/maintenance.service';
import {AttachmentService} from './services/attachment.service';
import {UserService} from './services/user.service';
import {MachineService} from './services/machine.service';
import {StepService} from './services/step.service';
import {ZoneService} from './services/zone.service';
import {UserMaintenanceService} from './services/user-maintenance.service';
import {LoginService} from './services/login.service';
import {StorageService} from './services/storage.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ChatService} from './services/chat.service';
import {DataSharingService} from './services/data-sharing.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    MaintenanceService,
    UserService,
    AttachmentService,
    MachineService,
    StepService,
    ZoneService,
    UserMaintenanceService,
    LoginService,
    StorageService,
    AuthGuardService,
    ChatService,
    DataSharingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
