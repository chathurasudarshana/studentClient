import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-notification',
  templateUrl: './success-notification.component.html',
})
export class SuccessNotificationComponent implements OnInit {

  @Input() public message: string = '';
  @Output() public whenClose: EventEmitter<void> = new EventEmitter();


  ngOnInit(): void {
  }

  close() {
    this.whenClose.emit();
  }

}
