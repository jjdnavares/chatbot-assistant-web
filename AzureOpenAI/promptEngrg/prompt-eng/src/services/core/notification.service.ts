import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private message  = new BehaviorSubject('Initial Message!');
  private subscription  = new BehaviorSubject('Initial Message!');

  getMessage = this.message.asObservable();

  constructor() {

  }

  setMessage(message: string){
    this.message.next(message);
  }



  addPushSubscriber(subscription: any): Observable<any> {    
    console.log("pushSubscriber method", subscription);
    return of(1);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}

