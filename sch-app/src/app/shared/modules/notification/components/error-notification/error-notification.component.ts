import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
})
export class ErrorNotificationComponent implements OnInit {

  @Input() public message: string= '';
  @Output() public whenClose: EventEmitter<void> = new EventEmitter();


  ngOnInit(): void {
  }

  close() {
    this.whenClose.emit();
  }

}
