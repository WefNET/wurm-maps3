import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XanaduComponent } from './maps/xanadu/xanadu.component';

const routes: Routes = [
  {
    path: 'xanadu',
    component: XanaduComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
