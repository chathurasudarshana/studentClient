import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-notification',
  templateUrl: './warning-notification.component.html',
})
export class WarningNotificationComponent implements OnInit {

  @Input() public message: string = '';
  @Output() public whenClose: EventEmitter<void> = new EventEmitter();


  ngOnInit(): void {
  }

  close() {
    this.whenClose.emit();
  }

}
