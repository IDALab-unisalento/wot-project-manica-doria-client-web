import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Machine } from '../models/machine';
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
export class MachineService {

  private getAllMachineUrl = ApiVariables.apiUrlMachine + '/getAll';
  private getMachineByIdUrl = ApiVariables.apiUrlMachine + '/getById/';
  private saveMachineUrl = ApiVariables.apiUrlMachine + '/save';
  private deleteMachineUrl = ApiVariables.apiUrlMachine + '/delete/';


  constructor(private http: HttpClient) { }

  getAllMachine(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.getAllMachineUrl).pipe(
      catchError(this.handleError)
    );
  }

  getMachineById(id: string): Observable<Machine> {
    return this.http.get<Machine>(this.getMachineByIdUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  saveMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.saveMachineUrl, machine, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteMachine(id: string): Observable<Machine> {
    return this.http.delete<Machine>(this.deleteMachineUrl + id).pipe(
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
