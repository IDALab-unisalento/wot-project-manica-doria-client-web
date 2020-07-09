import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent} from '@angular/common/http';
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
  private saveVideoUrl = ApiVariables.apiUrlAttachment + '/saveVideo/';
  private deleteAttachmentUrl = ApiVariables.apiUrlAttachment + '/delete/';
  private uploadAttachmentUrl = ApiVariables.apiUrlAttachment + '/upload/';
  private getFileAttachmentUrl = ApiVariables.apiUrlAttachment + '/getFile/';

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

  saveVideo(attachment: Attachment, id_steo: number): Observable<Attachment> {
    return this.http.post<Attachment>(this.saveVideoUrl + id_steo, attachment, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAttachment(id: string): Observable<Attachment> {
    return this.http.delete<Attachment>(this.deleteAttachmentUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(file: File, type: string, step_id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<HttpEvent<any>>(this.uploadAttachmentUrl + type + '/' + step_id, formData, {responseType: 'text'} as any);

  }

  getAttachment(id: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.getFileAttachmentUrl + id);
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
