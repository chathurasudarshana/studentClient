import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ImageApiService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}


  public uploadStudentProfile(file: File): Observable<{ filename: string }> {
    const form = new FormData();
    form.append('file', file);

    return this.httpClient.post<{ filename: string }>(
      `${this.baseUrl}/api/Image/uploadStudentProfile`,
      form
    );
  }

  public deleteStudentProfile(fileName: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/api/Image/deleteStudentProfile/${fileName}`
    );
  }
}
