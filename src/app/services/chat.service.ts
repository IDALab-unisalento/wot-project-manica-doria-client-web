import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Chat } from '../models/chat';
import { ApiVariables } from '../common/ApiVariables';
import { catchError, switchMap } from 'rxjs/operators';
import { Message } from '../models/message';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private getAllChatUrl = ApiVariables.apiUrlChat + '/getAll';
  private getChatByMaintenanceUrl = ApiVariables.apiUrlChat + '/getByMaintenanceId/';
  private getChatByIdUrl = ApiVariables.apiUrlChat + '/getById/';
  private saveChatUrl = ApiVariables.apiUrlChat + '/save';
  private deleteChatUrl = ApiVariables.apiUrlChat + '/delete/';
  private updateChatUrl = ApiVariables.apiUrlChat + '/update';
  private sendMessageUrl = ApiVariables.apiUrlChat + '/sendMessage';
  nameMaintenance: string;


  constructor(private http: HttpClient) { }

  getMessageByMaintenanceId(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.getChatByMaintenanceUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  getAllChats() {
    return this.http.get<Chat[]>(this.getAllChatUrl).pipe(
      catchError(this.handleError)
    );
  }

  saveChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.saveChatUrl, chat, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  sendMessage(message: Message) {
    return this.http.post<Message>(this.sendMessageUrl, message, httpOptions).pipe(
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

