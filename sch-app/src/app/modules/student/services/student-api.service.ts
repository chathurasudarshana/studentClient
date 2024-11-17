import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable()
export class StudentApiService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getStudents(isActive: boolean | null): Observable<Array<Student>> {

    let params = new HttpParams();

    if (isActive !== null) {
      params = params.set('isActive', isActive);
    }

    return this.httpClient.get<Array<Student>>(`${this.baseUrl}/api/Students`, { params: params });
  }

  public getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/api/Students/${id}`);
  }

  public insertStudent(student: Student): Observable<number> {

    return this.httpClient.post<number>(`${this.baseUrl}/api/Students`, student);
  }

  public updateStudent(student: Student): Observable<void> {
    return this.httpClient.patch<void>(`${this.baseUrl}/api/Students/${student.id}`, student);
  }

  public deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/Students/${id}`);
  }
}
