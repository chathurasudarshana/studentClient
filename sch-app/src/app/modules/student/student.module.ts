import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentApiService } from './services/student-api.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentInfoComponent } from './components/student-info/student-info.component';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentInfoComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    GridModule,
    ReactiveFormsModule,
  ],
  providers: [
    StudentApiService
  ]
})
export class StudentModule { }
