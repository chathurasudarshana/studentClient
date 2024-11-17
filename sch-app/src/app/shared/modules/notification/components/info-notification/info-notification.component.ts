import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-notification',
  templateUrl: './info-notification.component.html',

})
export class InfoNotificationComponent implements OnInit {

  @Input() public message: string = '';
  @Output() public whenClose: EventEmitter<void> = new EventEmitter();


  ngOnInit(): void {
  }

  close() {
    this.whenClose.emit();
  }

}
