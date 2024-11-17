import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotificationService } from './services/app-notification.service';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { SuccessNotificationComponent } from './components/success-notification/success-notification.component';
import { WarningNotificationComponent } from './components/warning-notification/warning-notification.component';
import { InfoNotificationComponent } from './components/info-notification/info-notification.component';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';



@NgModule({
  declarations: [
    SuccessNotificationComponent,
    WarningNotificationComponent,
    InfoNotificationComponent,
    ErrorNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationModule
  ],
  providers: [
    AppNotificationService
  ]
})
export class AppNotificationModule { }
