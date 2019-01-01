import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { XanaduComponent } from './maps/xanadu/xanadu.component';
import { DeliComponent } from './maps/deli/deli.component';
import { PristineComponent } from './maps/pristine/pristine.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'xanadu', component: XanaduComponent },
  { path: 'maps/xanadu', component: XanaduComponent },
  { path: 'deliverance', component: DeliComponent },
  { path: 'pristine', component: PristineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
