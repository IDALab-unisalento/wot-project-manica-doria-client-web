import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Beacon } from '../models/beacon';
import { ApiVariables } from '../common/ApiVariables';
import { catchError } from 'rxjs/internal/operators/catchError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  private getAllBeaconUrl = ApiVariables.apiUrlBeacon + '/getAll';
  private getBeaconByIdUrl = ApiVariables.apiUrlBeacon + '/getById/';
  private saveBeaconUrl = ApiVariables.apiUrlBeacon + '/save';
  private modifyBeaconUrl = ApiVariables.apiUrlBeacon + '/modify';
  private deleteBeaconUrl = ApiVariables.apiUrlBeacon + '/delete/';

  constructor(private http: HttpClient) { }

  getAllBeacon(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(this.getAllBeaconUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBeaconById(id: string): Observable<Beacon> {
    return this.http.get<Beacon>(this.getBeaconByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveBeacon(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(this.saveBeaconUrl, beacon, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  modifyBeacon(beacon: Beacon): Observable<Beacon> {
    return this.http.put<Beacon>(this.modifyBeaconUrl, beacon, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteBeacon(id: number): Observable<Beacon> {
    return this.http.delete<Beacon>(this.deleteBeaconUrl + id).pipe(
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
