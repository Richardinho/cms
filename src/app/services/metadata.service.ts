import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MetadataService {

  constructor(
    private http: HttpClient,
  ) {}

  putMetadata(token:string, metadata: any) {
    const url = environment.blogDomain + '/index.php/api/metadata';
    const formData = new FormData();
    formData.append('github_url', metadata.github_url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
        'enctype': 'multipart/form-data',
      })
    };

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
  }

  getMetadata(token: string) {
    const url = environment.blogDomain + '/index.php/api/metadata';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${token}`,
      })
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            return throwError({
              status: error.status
            });
          } else {
            return throwError({
              message: 'an error occurred'
            });
          }
        })
      );
  }
}
