import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckInComponent } from './check-in/check-in.component';
import { RouterModule} from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatComponentV2 } from './chat-v2/chat-v2.component';
import { MapComponent } from './map/map.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { SettingComponent } from './setting/setting.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    ChatComponent, 
    ChatComponentV2,
    HomeComponent, 
    MapComponent,  
    CarouselComponent,
    SettingComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    HttpClientModule,  
    RouterModule, 
    ToastrModule.forRoot(),
    MatTabsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    //QRCodeModule,
    BrowserAnimationsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
