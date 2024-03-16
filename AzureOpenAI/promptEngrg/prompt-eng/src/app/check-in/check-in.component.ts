//core
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { ThemePalette } from '@angular/material/core';
import { map } from 'rxjs/operators';

//custom services
import { ReservationService } from '../../services/reservation/reservation.service'
import { UserService } from '../../services/user/user.service';
import { SpaceService } from '../../services/space/space.service';
import { GeoService } from '../../services/core/geolocation.service';

//models
import { ReservationDetails, UserSpaceReservation } from '../../misc/model/reservation.model';
import { UserProfile, UserReservationDetails } from '../../misc/model/user.model';
import { Space } from '../../misc/model/space.model';
import { Facility } from '../../misc/model/location.model';


const COMPLETE_STATUS = "Completed";
const VALID_RADIUS = 1;

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})


export class CheckInComponent  implements OnInit{

  //public id: number = 0;
  
  public color: ThemePalette = 'accent';
  public checked = false;
  public disabled = false;
  public actionMsg: string;
  public errorMsg: string;
  public checkInInd: boolean = false;
  public dateToday: string = new Date().toLocaleDateString();  
  public isExec: boolean = false;

  //public currentRole: any;

  //Reservation variables
  public reservationlist: UserSpaceReservation[];

  //User profile variables
  public currentUser: UserProfile;  
  public userList: UserProfile[];

  //Space variables
  public spaces: Space[];
  public facilities: Facility[];

  //Location variables
  private coordinates: any = {};
  public distance: number = 100;

  public spaceReservation: any[];

  public locationId: any;

  public options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  }
 
  constructor(    
    
   

      private reservationService: ReservationService
    , private userService : UserService
    , private spaceService : SpaceService    
    , private geoService: GeoService,
    
  
    ) {

      this.getCurrentuser();
      this.getuserSpaceReservation();
      this.getSpaceList();
      this.getFacilities();

      //console.log("User PeopleKey", this.currentUser.PeopleKey);

      

  }

  success(pos: any) {
    const crd = pos.coords;
    let target = {
      latitude: 0,
      longitude: 0,
    };
   
  
    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log("Congratulations, you reached the target");
      navigator.geolocation.clearWatch(this.locationId);
    }
  }
  
  error(err: any) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }
  
  ngOnInit(): void {    
    
    //this.merge();
    
  }

  checkOut(reservation: any){

    this.actionMsg = "You have successfully Checked-Out.";
    this.checkInInd = false;

  }

  checkIn(reservation: any){

    this.getLocation(reservation.Latitude, reservation.Longitude);
    this.locationId = navigator.geolocation.watchPosition(this.success, this.error, this.options);
    // console.log("LocationId", this.locationId );    
    // console.log("Distance", this.distance);

    if (this.distance < VALID_RADIUS)
    {
      this.actionMsg = "You have successfully Checked-In.";
      this.checkInInd = true;
    }
    else {
      this.errorMsg ="Check-In error. You are outside the 1 KM radius from the office location."
    }
   

    console.log("errorMsg", this.errorMsg);


  }

  roundDown(number: number, decimals?: number) {
    decimals = decimals || 0;
    return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}
  
  getLocation(officelat: number, officelong: number){

    return this.geoService.getLatLong.subscribe((result:any) =>{
      let res = result

      this.distance = this.roundDown
        (this.geoService.calcCrow(result.latitude, result.longitude, officelat, officelong))
        
        ;
      console.log("Location Service:",res)
      console.log("dist",this.distance);

      if(this.distance > 1 && this.checkInInd == true){
        this.actionMsg = "You are outside the 1 km radius within the office location. Would you like to check-out?"
      }

      return this.distance;
    })

  }

  getCurrentuser(){

    let usercache = localStorage.getItem("currentUser")
     if(usercache)
     {
      //console.log(localStorage.getItem("currentUser"));
      this.currentUser = JSON.parse(usercache);

      let role =  JSON.stringify(this.currentUser.CareerLevelDesc);

      if (role.includes("Leadership") ||role.includes("Director") )
        this.isExec =  true

      console.log("this.isExec", this.isExec);

     }

  }


  getUserList(): void {
    this.userService.getUserList()
       .subscribe(users => 
         {
           this.userList = users
           //console.log("Space List:");
           //console.log(this.spaces);
         });
     
   }

  getSpaceList(): void {
    this.spaceService.getSpaceList()
       .subscribe(spaces => 
         {
           this.spaces = spaces
           //console.log("Space List:");
           //console.log(this.spaces);
         });
     
   }

   getFacilities(): void {
    this.spaceService.getFacilities()
       .subscribe(facilities => 
         {
           this.facilities = facilities
           //console.log("Space List:");
           //console.log(this.spaces);
         });
     
   }

   getUserReservations(): void {
    let result = this.reservationService.getReservations()
       .pipe(map(rsv => 
         {
          return rsv
    
         })
         ).subscribe((userRsv)=>{
    

         })

         ;

      //console.log(result);
     
   }

   addDays (date: any, daysToAdd: any) {
    var _24HoursInMilliseconds = 86400000;
    return new Date(date.getTime() + daysToAdd * _24HoursInMilliseconds);
  };


   getuserSpaceReservation(): void {
    this.reservationService.getUserSpaceReservations()     
         .subscribe((userRsv)=>{

          console.log(userRsv);

          let today = this.addDays(new Date(), - 0.5); //Bakit 0.5 nagana?
           
          //let yesterday = this.addDays(today, - 1);
          //console.log("yesterday", yesterday);
          this.reservationlist = userRsv;
                 console.log("newDate",new Date());

         })

         ;

      console.log("filtered", this.reservationlist);
     
   }



}




  // merge(){
  //   //let merge = (this.reservationlist, this.spaces) => ({...this.reservationlist, ...this.spaces})


  //   let spaceFacilities = this.spaces.map((item, i) => Object.assign({}, item, this.facilities[i]));        
  //   this.spaceReservation = this.reservationlist.map((item, i) => Object.assign({}, item, spaceFacilities[i]));

  //   this.spaceReservation = this.spaceReservation.filter((res: any)  => res.ReservationStatus == COMPLETE_STATUS)

  //   console.log(COMPLETE_STATUS);
  //   console.log("spaceReservation", this.spaceReservation);

  // }