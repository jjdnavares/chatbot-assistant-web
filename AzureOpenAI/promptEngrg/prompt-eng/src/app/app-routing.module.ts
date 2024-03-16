import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckInComponent } from './check-in/check-in.component';
import { ChatComponentV2 } from './chat-v2/chat-v2.component';
import { ReservationComponent } from './reservation/reservation.component';


const routes: Routes = [

  { path: 'chat', component: ChatComponentV2 },
  { path: 'home', component: HomeComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
