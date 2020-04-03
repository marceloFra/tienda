import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MenuComponent } from './shared/menu/menu.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ClienteComponent } from './components/cliente/cliente.component';
import { DeudasComponent } from './components/deudas/deudas.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductoComponent,
    ClienteComponent,
    DeudasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase),

     AngularFireStorageModule,
     AngularFirestoreModule,
     FormsModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     MatInputModule,
     SweetAlert2Module
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
