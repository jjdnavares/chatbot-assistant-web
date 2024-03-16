import { Component,Inject, Injectable, ChangeDetectorRef, Input  } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';

import { GeoService } from '../../services/core/geolocation.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  //@Input() locationDetails: any;
  public sampleHTML: any;

  public location: any;
  message: string ="";
    constructor(
        private readonly geolocation$: GeolocationService,
        private changeDetectorRef: ChangeDetectorRef,
        private geoService: GeoService
    ) {

        this.geoService.getMessage.subscribe(msg =>{this.message = msg})
    
      } 

  ngOnInit(){      
     this.sampleHTML = "<!DOCTYPE html> <html> <head> <title>Welcome to My Website</title> </head>"

  }

  

}
