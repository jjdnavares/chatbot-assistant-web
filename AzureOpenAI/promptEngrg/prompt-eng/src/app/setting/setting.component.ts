import { Component,Inject, Injectable, ChangeDetectorRef, Input  } from '@angular/core';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  //@Input() locationDetails: any;

  public color: ThemePalette = 'accent';
  public checked = false;
  public isDevToolEnabled = false;
  public disabled = false;
  public sampleHTML: any;

  public location: any;
  message: string ="";
    constructor(
  
    ) {

     
    
      } 

  ngOnInit(){      

    let isTextToSpeechCache = localStorage.getItem("isTextToSpeech");

    if (isTextToSpeechCache){

        if (isTextToSpeechCache=="true")
          this.checked =  true;
        else
          this.checked = false;

    }


    let isDevToolEnabledCache = localStorage.getItem("isDevToolEnabled");

    if (isDevToolEnabledCache){

        if (isDevToolEnabledCache=="true")
          this.isDevToolEnabled =  true;
        else
          this.isDevToolEnabled = false;

    }



    
   
  }

  onValChange(event: any){

    this.checked = event.checked;
    let isTextToSpeech;

    if (this.checked)
      isTextToSpeech = "true"
    else
    isTextToSpeech = "false"

    localStorage.setItem("isTextToSpeech", isTextToSpeech);
    //console.log("event", event);
  }

  devToolToggle(event: any){

    this.isDevToolEnabled = event.checked;
    let isDevTool;

    if (this.checked)
      isDevTool = "true"
    else
      isDevTool = "false"

    localStorage.setItem("isDevToolEnabled", isDevTool);
    console.log("event", event);
  }


  

  

}
