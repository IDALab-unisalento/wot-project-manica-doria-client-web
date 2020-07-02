import { Step } from '../models/step';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
export class StepService {

  private getAllStepUrl = ApiVariables.apiUrlStep + '/getAll';
  private getStepByIdUrl = ApiVariables.apiUrlStep + '/getById/';
  private getStepByMaintenanceIdUrl = ApiVariables.apiUrlStep + '/getByMaintenanceId/';
  private getStepByZoneIdUrl = ApiVariables.apiUrlStep + '/getByZoneId/';
  private saveStepUrl = ApiVariables.apiUrlStep + '/save';
  private deleteStepUrl = ApiVariables.apiUrlStep + '/delete/';
  private completeStepUrl = ApiVariables.apiUrlStep + '/complete/';

  constructor(private http: HttpClient) { }

  getAllStep(): Observable<Step[]> {
    return this.http.get<Step[]>(this.getAllStepUrl);
  }

  getStepById(id: string): Observable<Step> {
    return this.http.get<Step>(this.getStepByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveStep(step: Step): Observable<Step> {
    return this.http.post<Step>(this.saveStepUrl, step, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteStep(id: number): Observable<Step> {
    return this.http.delete<Step>(this.deleteStepUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  getStepByMaintenanceId(id: number): Observable<Step[]> {
    return this.http.get<Step[]>(this.getStepByMaintenanceIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  getStepByZoneId(id: string): Observable<Step[]> {
    return this.http.get<Step[]>(this.getStepByZoneIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  completeStep(duration: number, idStep: number, idMaintenance: number): Observable<Step> {
    return this.http.put<Step>(this.completeStepUrl + duration + '/' + idStep + '/' + idMaintenance,  httpOptions)
        .pipe(
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
