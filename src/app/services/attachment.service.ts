import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Attachment } from '../models/attachment';
import { Observable, throwError } from 'rxjs';
import { ApiVariables } from '../common/ApiVariables';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private getAllAttachmentUrl = ApiVariables.apiUrlAttachment + '/getAll';
  private getAttachmentByIdUrl = ApiVariables.apiUrlAttachment + '/getById/';
  private saveAttachmentUrl = ApiVariables.apiUrlAttachment + '/save';
  private deleteAttachmentUrl = ApiVariables.apiUrlAttachment + '/delete/';

  constructor(private http: HttpClient) { }

  getAllAttachment(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.getAllAttachmentUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAttachmentById(id: string): Observable<Attachment> {
    return this.http.get<Attachment>(this.getAttachmentByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveAttachment(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(this.saveAttachmentUrl, attachment, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAttachment(id: string): Observable<Attachment> {
    return this.http.delete<Attachment>(this.deleteAttachmentUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
