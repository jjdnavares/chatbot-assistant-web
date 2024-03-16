import { Injectable } from '@angular/core';
import { Observable, of, Subject} from 'rxjs';

import { reservation_details, user_space_reservation } from '../reservation-mock';
import { ReservationDetails, UserSpaceReservation } from '../..//misc/model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { } 

  getReservations(): Observable<ReservationDetails[]> {
   const reservation  = of(reservation_details);
    return reservation;
  }


  getUserSpaceReservations(): Observable<UserSpaceReservation[]> {
    const reservation  = of(user_space_reservation);
     return reservation;
   }
 



}//end class
