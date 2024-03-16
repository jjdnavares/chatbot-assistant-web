import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef, isDevMode } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
// import { PwaService } from '../services/core/pwa.service';
// import { GeolocationService } from '@ng-web-apis/geolocation';
// import { GeoService } from '../services/core/geolocation.service';
// import { NotificationService } from '../services/core/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { UserProfile } from '..//misc/model/user.model';
import { SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  public location: any;
  public currentUser: UserProfile;
  public userlist: UserProfile[] =[];
  readonly VAPID_PUBLIC_KEY = "BAeWGKQYM_x9kFfNx2glyHM6LH9---ehfboxVWHiPYgDH_oAuS1tZxnYqdPpbHK7K2Ucp8KqdBAw2Se0HsqNrsc";

  locationDetails = "This is Sample Data From App Component";



  constructor(
    // private readonly geolocation$: GeolocationService,
    private changeDetectorRef: ChangeDetectorRef,
    private observer: BreakpointObserver, 
    private router: Router,
    // public Pwa: PwaService,
    // private geoService: GeoService,
    private userService: UserService,
    private toastr: ToastrService,
    private swPush: SwPush,
    // private notificationService: NotificationService
    ) 
    {

      this.userService.getUserList()
      .subscribe(users => 
        {
          this.userlist = users       
        });

      //this.geoService.getLatLong.subscribe((result:any) =>{console.log("Location:",result)})
    }

    subscribeToNotifications() {

      this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      // .then(sub => this.notificationService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }


  switchAccount(user:any){
    //console.log("user", user);
    this.currentUser = user;

    localStorage.setItem("currentUser", JSON.stringify(user));

    //this.reloadCurrentRoute();
    window.location.reload();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ngOnInit() {
    let usercache = localStorage.getItem("currentUser")
     if(usercache)
     {
      console.log(localStorage.getItem("currentUser"));
      this.currentUser = JSON.parse(usercache);
     }
      
     else{

      this.currentUser= {
        PeopleKey: 600617,
        LastNm: "Cruz", 
        FirstNm: "Alex",
        Eid: "alex.cruz", 
        CareerLevelDesc: "Accenture Leadership",
        Role: ["Employee"],
        Profile: "assets/user1.png"
      }

     }

     localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  // installPwa(): void {
  //   this.Pwa.promptEvent.prompt();
  // }

  
}
