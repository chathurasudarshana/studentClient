import { Injectable } from '@angular/core';
import { NotificationRef, NotificationService, NotificationSettings } from '@progress/kendo-angular-notification';
import { ErrorNotificationComponent } from '../components/error-notification/error-notification.component';
import { InfoNotificationComponent } from '../components/info-notification/info-notification.component';
import { SuccessNotificationComponent } from '../components/success-notification/success-notification.component';
import { WarningNotificationComponent } from '../components/warning-notification/warning-notification.component';

@Injectable()
export class AppNotificationService {

  constructor(
    private notificationService: NotificationService
  ) { }


  public showSuccess(message: string): void {

    const content: Function = SuccessNotificationComponent;
    const type = 'success';
    this.showNotification(message, content, type);
  }

  public showWarning(message: string): void {

    const content: Function = WarningNotificationComponent;
    const type = 'warning';
    this.showNotification(message, content, type);
  }

  public showInfo(message: string): void {

    const content: Function = InfoNotificationComponent;
    const type = 'info';
    this.showNotification(message, content, type);
  }

  public showError(message: string): void {

    const content: Function = ErrorNotificationComponent;
    const type = 'error';
    this.showNotification(message, content, type);
  }

  private showNotification(
    message: string,
    content: Function,
    type: 'none' | 'success' | 'warning' | 'error' | 'info') {

    const hideAfter = 3000;

    const setting: NotificationSettings = {
      content: content,
        hideAfter: hideAfter,
        position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: type, icon: false },
      closable: false
    };

    const notificationRef: NotificationRef
      = this.notificationService.show(setting);

    notificationRef!.content!.instance.message = message;
    notificationRef!.content!.instance.whenClose.subscribe(
      () => {
        notificationRef.hide();
      }
    );
  }

}
