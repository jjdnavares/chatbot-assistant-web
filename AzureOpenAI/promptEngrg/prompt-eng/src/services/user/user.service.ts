import { Injectable } from '@angular/core';
import { user_directory } from '../user-details-mock';
import { UserProfile } from '../../misc/model/user.model';
import { Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  getUserList(): Observable<UserProfile[]> {
      const users  = of(user_directory);
      return users;
  }



}//end class
