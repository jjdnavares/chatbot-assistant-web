import { Injectable } from '@angular/core';
import { space_list } from '../../services/space-details-mock';
import { location_details } from '../../services/location-details-mock';
import { Space } from '../../misc/model/space.model';
import { Observable, of, Subject} from 'rxjs';
import { Facility } from '../../misc/model/location.model';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor() { }


  getSpaces(): Space[] {
    return space_list;
  }

  getSpaceList(): Observable<Space[]> {
   const spaces  = of(space_list);
    return spaces;
  }

  getFacilities(): Observable<Facility[]> {
    const location  = of(location_details);
     return location;
   }



}//end class
