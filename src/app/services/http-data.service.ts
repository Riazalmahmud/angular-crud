import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  base_url = 'http://localhost:3000/students';
  constructor(private _http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  handaleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('an error occured', error.error.message);
    } else {
      console.error(
        `backend returned code erro ${error.status}`,
        `body was ${error.error}`
      );
    }

    return throwError('Something bad happend : please try agin');
  }
  createItem(item: any): Observable<Student> {
    return this._http
      .post<Student>(this.base_url, JSON.stringify(item), this.httpOption)
      .pipe(retry(2), catchError(this.handaleError));
  }

  getList(): Observable<Student> {
    return this._http
      .get<Student>(this.base_url)
      .pipe(retry(2), catchError(this.handaleError));
  }

  getItem(id: string): Observable<Student> {
    return this._http
      .get<Student>(this.base_url + '/' + id)
      .pipe(retry(2), catchError(this.handaleError));
  }

  getUpdate(id: string, item: any): Observable<Student> {
    return this._http
      .put<Student>(
        this.base_url + '/' + id,
        JSON.stringify(item),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handaleError));
  }
  deleteItem(id: string) {
    return this._http
      .delete<Student>(this.base_url + '/' + id, this.httpOption)
      .pipe(retry(2), catchError(this.handaleError));
  }
}
