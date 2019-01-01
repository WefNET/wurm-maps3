import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XanaduComponent } from './maps/xanadu/xanadu.component';

import { CommonService } from './services/common.service'
import { StyleService } from './services/style.service'
import { SheetsService } from './services/sheets.service'
import { LayersService } from './services/layers.service'

@NgModule({
  declarations: [
    AppComponent,
    XanaduComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    SelectButtonModule,
    SidebarModule,
    ToastModule
  ],
  providers: [
    MessageService,
    CommonService,
    StyleService,
    SheetsService,
    LayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
