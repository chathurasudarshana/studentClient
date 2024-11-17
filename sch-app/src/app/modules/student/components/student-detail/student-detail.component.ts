import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../interfaces/student';
import { StudentApiService } from '../../services/student-api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { AppNotificationService } from '../../../../shared/modules/notification/services/app-notification.service';
import { ImageApiService } from '../../../../shared/services/image-api.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'sch-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  public studentId = 0;

  public student: Student | null = null;

  public isStudentLoading = false;
  public isStudentSaving = false;
  public isUploadingImage = false;
  public isDeletingImage = false;

  public studentForm: FormGroup;

  public isImageChanged = false;
  private profileImageFile: File | null = null;
  public profileImage = '';
  private readonly baseUrl = environment.baseUrl;

  constructor(
    private _avRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private studentApiService: StudentApiService,
    private appNotificationService: AppNotificationService,
    private imageApiService: ImageApiService
  ) {
    this.studentForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.minLength(2)]],
      email: [null, [Validators.email]],
      phoneNumber: [null, [Validators.pattern('^[0-9]{10}$')]],
      ssn: [null, [Validators.required, Validators.minLength(2)]],
      startDate: [null],
    });
  }

  ngOnInit(): void {
    this._avRoute.params.subscribe((params) => {
      this.studentId = +params['id'] || 0;

      this.setStudent();
    });
  }

  private reset(): void {
    this.student = null;
    this.profileImageFile = null;
    this.profileImage = '';
    this.isImageChanged = false;
    this.studentForm.reset({
      id: 0,
      firstName: '',
      lastName: null,
      email: null,
      phoneNumber: null,
      ssn: null,
      startDate: null,
    });
  }

  private setStudent(): void {
    this.reset();
    if (this.studentId) {
      this.isStudentLoading = true;
      this.studentApiService
        .getStudent(this.studentId)
        .subscribe((student) => {
          if (student) {
            this.student = student;

            if (this.student.startDate) {
              this.student.startDate = new Date(this.student.startDate);
            }

            if (this.student.image) {
              this.student.imageUrl
              = `${this.baseUrl}/api/Image/getStudentProfile/${this.student.image}`;
            }

            this.setFormData();
          } else {
            this.router.navigate(['../', 0], { relativeTo: this._avRoute });
          }
        })
        .add(() => {
          this.isStudentLoading = false;
        });
    } else {
      this.setFormData();
    }
  }

  private setFormData(): void {

    if (this.student) {
      let date: string | null = null;
      if (this.student.startDate) {
        date = formatDate(this.student.startDate, 'yyyy-MM-dd', 'en');
      }

      this.studentForm.setValue({
        id: this.student.id,
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email,
        phoneNumber: this.student.phoneNumber,
        ssn: this.student.ssn,
        startDate: date,
      });
    }
  }

  public onSubmit() {
    if (this.studentForm.valid) {
      if (this.isImageChanged && this.profileImageFile) {
        this.uploadImage();
      } else {
        let image: string | null = null;

        if (this.student) {
          image = this.student.image;
        }

        this.saveStudent(image);
      }
    } else {
      this.validateAllFormFields(this.studentForm);
    }
  }

  private uploadImage(): void {
    this.isUploadingImage = true;

    this.imageApiService
      .uploadStudentProfile(this.profileImageFile!)
      .subscribe((data) => {
        this.saveStudent(data.filename);
      })
      .add(() => {
        this.isUploadingImage = false;
      });
  }

  private deleteImage(fileName: string): void {
    this.isDeletingImage = true;
    this.imageApiService
      .deleteStudentProfile(fileName)
      .subscribe()
      .add(() => {
        this.isDeletingImage = false;
      });
  }

  private saveStudent(image: string | null): void {
    const student: Student = {
      id: this.studentForm.value.id,
      firstName: this.studentForm.value.firstName,
      lastName: this.studentForm.value.lastName,
      email: this.studentForm.value.email,
      phoneNumber: this.studentForm.value.phoneNumber,
      ssn: this.studentForm.value.ssn,
      startDate: new Date(this.studentForm.value.startDate),
      image: image,
      isActive: true,
      imageUrl: null
    };

    if (student.id > 0) {
      this.isStudentSaving = true;
      this.studentApiService
        .updateStudent(student)
        .subscribe(() => {
          if (this.isImageChanged && this.student!.image) {
            this.deleteImage(this.student!.image);
          }
          this.setStudent();
          this.appNotificationService.showSuccess(
            'Student updated successfully'
          );
        })
        .add(() => {
          this.isStudentSaving = false;
        });
    } else {
      this.isStudentSaving = true;
      this.studentApiService
        .insertStudent(student)
        .subscribe((id) => {
          this.router.navigate(['../', id], { relativeTo: this._avRoute });
          this.appNotificationService.showSuccess('Student added successfully');
        })
        .add(() => {
          this.isStudentSaving = false;
        });
    }
  }

  public onBack(): void {
    this.router.navigate(['../../list'], { relativeTo: this._avRoute });
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length) {
      const file: File = event.target.files[0];
      const mimeType = file.type;
      const fileName = file.name;
      const fileSize = file.size;
      const supportedImageTypes = [
        '.jpg',
        '.png',
        '.jpeg',
        '.JPG',
        '.PNG',
        '.JPEG',
      ];
      const type = supportedImageTypes.find((t) => fileName.endsWith(t));
      const mimeTypePattern = /image\/*/;
      const bannerImageFileMaxSize = 2097152;
      if (mimeTypePattern.exec(mimeType) === null || !type) {
        this.appNotificationService.showError(
          'File type should be JPG, JPEG or PNG'
        );
      } else if (fileSize > bannerImageFileMaxSize) {
        this.appNotificationService.showError(
          'Please upload a file that not exceed 2MB'
        );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.profileImage = reader.result as string;
        };
        this.isImageChanged = true;
        this.profileImageFile = file;
      }
    }
  }

  get formControls() {
    return this.studentForm.controls;
  }
}
