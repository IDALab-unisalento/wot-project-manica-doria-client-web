import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Zone } from '../models/zone';
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
export class ZoneService {

  private getAllZoneUrl = ApiVariables.apiUrlZone + '/getAll';
  private getZoneByIdUrl = ApiVariables.apiUrlZone + '/getById/';
  private saveZoneUrl = ApiVariables.apiUrlZone + '/save';
  private deleteZoneUrl = ApiVariables.apiUrlZone + '/delete/';
  private getAllZoneByMachineUrl = ApiVariables.apiUrlZone + '/getAllByMachineId/';

  constructor(private http: HttpClient) { }

  getAllZone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.getAllZoneUrl).pipe(
      catchError(this.handleError)
    );
  }

  getZoneById(id: string): Observable<Zone> {
    return this.http.get<Zone>(this.getZoneByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.saveZoneUrl, zone, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteZone(id: string): Observable<Zone> {
    return this.http.delete<Zone>(this.deleteZoneUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  getAllZoneByMachineId(id: string): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.getAllZoneByMachineUrl + id).pipe(
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
