import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'sch-student-info',
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent {
  @Input() public student: Student | null = null;
  @Output() public whenClose: EventEmitter<void> = new EventEmitter();

  public onClose(): void {
    this.whenClose.emit();
  }

}
