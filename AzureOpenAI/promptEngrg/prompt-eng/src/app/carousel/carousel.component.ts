import { Component, Input, ViewEncapsulation } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { DomSanitizer } from "@angular/platform-browser";
import { _countGroupLabelsBeforeOption } from "@angular/material/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {

  @Input() slides: any;
  @Input() contents: any;

  currentSlide = 0;
  type = "Database";

  public _tempContents: any;
  public _Count: Array<any>;
  
  public _data: Array<any> = [];
  
  public _air: any;
  constructor(
    private domSanitizer: DomSanitizer
  ) {
    
  }

  ngOnChanges() {
    this.getFilteredData();
    this.contents = this.contents.sort((a :any, b: any) => a.Health.localeCompare(b.Health));

    if (this.currentSlide === 0){
      this._data = this._Count.filter(x => x.Type === 'Database');
    }
    // console.log("data", this._tempContents);
  }

  getFilteredData(){
    let _databaseCritical = this.contents.filter((x: any) => x.Type === "Database").filter((x: any) => x.Health === "Critical");
    let _databaseUnhealthy = this.contents.filter((x: any) => x.Type === "Database").filter((x: any) => x.Health === "Unhealthy");
    let _applicationCritical = this.contents.filter((x: any) => x.Type === "Application").filter((x: any) => x.Health === "Critical");
    let _applicationUnhealthy = this.contents.filter((x: any) => x.Type === "Application").filter((x: any) => x.Health === "Unhealthy");
    let _webCritical = this.contents.filter((x: any) => x.Type === "Web").filter((x: any) => x.Health === "Critical");
    let _webUnhealthy = this.contents.filter((x: any) => x.Type === "Web").filter((x: any) => x.Health === "Unhealthy");

    let _database: Array<any> = [];
    _database.push(..._databaseCritical.filter((x: any, index: any) => index === 0));
    _database.push(..._databaseUnhealthy.filter((x: any, index: any) => index === 0));

    let _application: Array<any> = [];
    _application.push(..._applicationCritical.filter((x: any, index: any) => index === 0));
    _application.push(..._applicationUnhealthy.filter((x: any, index: any) => index === 0));

    let _web: Array<any> = [];
    _web.push(..._webCritical.filter((x: any, index: any) => index === 0));
    _web.push(..._webUnhealthy.filter((x: any, index: any) => index === 0));

    this._tempContents = [..._database, ..._application, ..._web];
    this._tempContents = this._tempContents.sort((a :any, b: any) => a.Health.localeCompare(b.Health));

    this._Count = [
      { 
        Type: 'Database',
        Health: 'Critical',
        Count: _databaseCritical.length
      },
      { 
        Type: 'Database',
        Health: 'Unhealthy',
        Count: _databaseUnhealthy.length
      },
      { 
        Type: 'Application',
        Health: 'Critical',
        Count: _applicationCritical.length
      },
      { 
        Type: 'Application',
        Health: 'Unhealthy',
        Count: _applicationUnhealthy.length
      },
      { 
        Type: 'Web',
        Health: 'Critical',
        Count: _webCritical.length
      },
      { 
        Type: 'Web',
        Health: 'Unhealthy',
        Count: _webUnhealthy.length
      }
    ];
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
    this.type = this.getTypeSlide();
    this.getData();

  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
    this.type = this.getTypeSlide();
    this.getData();
  }

  setBorder(Health: string){
    if (Health === "Critical"){
      return "red";
    }
    else if (Health === "Unhealthy"){
      return "yellow";
    }
    else
      return "green";
  }

  setBorder2(Health: string){
    if (Health === "Critical"){
      return "red2";
    }
    else if (Health === "Unhealthy"){
      return "yellow2";
    }
    else
      return "green2";
  }

  sanitizeHtml(html:any){
    return html === '' || html === null || html === undefined ? '' : this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  getData(){    
    this._data = this._Count.filter(x => x.Type === this.getTypeSlide());
  }

  onHealthChange($event: any) {
    let _health = $event.value === undefined ? '' : $event.value.split(':')[0].trim().toLowerCase();
    if (_health === ''){
      this.getFilteredData()
    }
    else
    {
      this._tempContents = _health === 'all' ? this.contents : this.contents.filter((x:any) => x.Health.toLowerCase() === _health && x.Type === this.getTypeSlide());
    }
  }

  getTypeSlide(): string{
    if (this.currentSlide === 0){
      return 'Database';
    }
    else if (this.currentSlide === 1){
      return 'Application';
    }
    else {
      return 'Web';
    }
  }
}
