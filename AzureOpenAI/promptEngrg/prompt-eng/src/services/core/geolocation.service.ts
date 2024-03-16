import { Injectable } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private message  = new BehaviorSubject('Initial Message!');
  private geoLocation  = new BehaviorSubject({
    latitude: 0,
    longitude: 0 
  });
  private location: any;

  getMessage = this.message.asObservable();
  getLatLong = this.geoLocation.asObservable();


  constructor(private readonly geolocation$: GeolocationService,) {
 
    let destLat = 14.327961;
    let destlong = 121.088177;

    this.getCurrentPosition();

    // setInterval((): void => {
    //   console.log('This will be displayed every 10000ms (10s).');
    //   this.getGeolocationData(destLat, destlong);
    // }, 10000);
}

  setMessage(message: string){
    this.message.next(message);
  }

  toRad(value: number){
    return value * Math.PI / 180;
}

  calcCrow(lat1: number, lon1 : number, lat2 : number, lon2: number) 
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }


  getCurrentPosition(){

    this.geolocation$.subscribe((position:any) => 
    {

      if (position)
      {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          //timestamp: position.timestamp
        } 
        //console.log(position);  
      }

      this.geoLocation.next(this.location);
    });   
    
  }

  //Use this to get the current location and target location distance
  getGeolocationandDistance( destLat: number, destlong: number){
    this.geolocation$.subscribe((position:any) => 
    {

      
      let distance = 0;
         
      if (position)
      {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          //timestamp: position.timestamp
        } 
        console.log(position);  
        
        distance = this.calcCrow(this.location.latitude, this.location.longitude, destLat, destlong)

        this.geoLocation.next(this.location);
        console.log("calcCrow", distance );
        //setTimeout(()=>{this.changeDetectorRef.detectChanges()},0);
        // if (distance < 2)
        // {
        //   this.router.navigate(['chat', 911])
        // }
      }      
          
    }
    );

  }


}





// getLatLong(){

//   this.geolocation$.subscribe((position:any) => {
    
//     //console.log(position);   

//     if (position)
//     {
//       this.location = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//         timestamp: position.timestamp
//       } 
//       setTimeout(()=>{this.changeDetectorRef.detectChanges()},0);
//     }  v      
  
//     }
//   );

// }
    
