import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student-api.service';
import { Student } from '../../interfaces/student';
import { FilterableSettings, SelectableSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'sch-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {

  public gridDataLoading = false;
  public isDeleing = false;

  public gridData: Array<Student> = [];


  public pageSizes: Array<number> = [5, 10, 15];
  public selectedStudent: Student | null = null;
  public selectedKeys: Array<number>=[];
  public filterMode: FilterableSettings = "row";
  public selectableSettings: SelectableSettings = {
    enabled: true,
    mode: 'single'
  };

  private readonly baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private _avRoute: ActivatedRoute,
    private studentApiService: StudentApiService) { }


  ngOnInit(): void {

    this.setGridData();
  }

  private setGridData() {
    this.gridDataLoading = true;

    this.studentApiService.getStudents(true).subscribe(data => {

      if (data?.length) {
        this.gridData = data;

        this.gridData.forEach(
          (student: Student) => {
            if (student.startDate) {
              student.startDate = new Date(student.startDate);
            }

            if (student.image) {
              student.imageUrl
              = `${this.baseUrl}/api/Image/getStudentProfile/${student.image}`;
            }

          }
        );
      } else {
        this.gridData = [];
      }


    }).add(
      () => {
        this.gridDataLoading = false;
      }
    );
  }

  public onSelectionChange(): void {
    const id = this.selectedKeys[0];

    this.selectedStudent = this.gridData.find(x => x.id === id)!;
  }

  public onCloseInfo(): void {
    this.selectedKeys = [];
    this.selectedStudent = null;
  }

  public onAdd(): void {
    this.router.navigate(
      ['../detail/0'],
      { relativeTo: this._avRoute });
  }

  public onEdit(student: Student): void {

    this.router.navigate(
      [`../detail/${student.id}`],
      { relativeTo: this._avRoute });
  }

  public onDelete(student: Student): void {
    this.isDeleing = true;
    this.studentApiService.deleteStudent(student.id).subscribe(()=> {
      this.setGridData();
    }).add(
      () => {
        this.isDeleing = false;
      }
    );

  }


}
