import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { XanaduComponent } from './maps/xanadu/xanadu.component';
import { PristineComponent } from './maps/pristine/pristine.component';
import { XanaduSideBySideComponent } from './maps/xanadu-side-by-side/xanadu-side-by-side.component';
import { HarmonyComponent } from './maps/harmony/harmony.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'xanadu', component: XanaduComponent },
  { path: 'xanadu-side-by-side', component: XanaduSideBySideComponent },
  { path: 'maps/xanadu', component: XanaduComponent },
  { path: 'pristine', component: PristineComponent },
  { path: 'harmony', component: HarmonyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
