import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaintenanceService } from './services/maintenance.service';
import { AttachmentService } from './services/attachment.service';
import { UserService } from './services/user.service';
import { MachineService } from './services/machine.service';
import { StepService } from './services/step.service';
import { ZoneService } from './services/zone.service';
import { UserMaintenanceService } from './services/user-maintenance.service';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ChatService } from './services/chat.service';
import { DataSharingService } from './services/data-sharing.service';
import { BeaconService } from './services/beacon.service';
import { NavbarHomeComponent } from './components/home/components/navbar-home/navbar-home.component';
import { MachineComponent } from './components/home/children/machine/machine.component';
import { BeaconComponent } from './components/home/children/beacon/beacon.component';
import { OperatorComponent } from './components/home/children/operator/operator.component';
import { MaintenanceComponent } from './components/home/children/maintenance/maintenance.component';
import { ListMaintenanceComponent } from './components/home/children/list-maintenance/list-maintenance.component';
import { DashboardComponent } from './components/home/children/dashboard/dashboard.component';
import { SideMenuOpenComponent } from './components/home/components/side-menu-open/side-menu-open.component';
import { SideMenuCloseComponent } from './components/home/components/side-menu-close/side-menu-close.component';
import { ListUserMaintenanceComponent } from './components/home/children/list-user-maintenance/list-user-maintenance.component';
import { ProfileComponent } from './components/home/children/profile/profile.component';
import { ChatComponent } from './components/home/children/chat/chat.component';
import { ListChatComponent } from './components/home/children/chat/list-chat/list-chat.component';
import { BodyChatComponent } from './components/home/children/chat/body-chat/body-chat.component';
import { ItemUserComponent } from './components/home/children/chat/item-user/item-user.component';
import { DetailsMaintenanceComponent } from './components/home/children/details-maintenance/details-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MachineComponent,
    BeaconComponent,
    OperatorComponent,
    MaintenanceComponent,
    ListMaintenanceComponent,
    NavbarHomeComponent,
    DashboardComponent,
    SideMenuOpenComponent,
    SideMenuCloseComponent,
    ListUserMaintenanceComponent,
    ProfileComponent,
    ChatComponent,
    ListChatComponent,
    BodyChatComponent,
    ItemUserComponent,
    DetailsMaintenanceComponent,

  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
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
    BeaconService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
