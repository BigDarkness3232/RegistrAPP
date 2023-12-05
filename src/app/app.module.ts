import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { QRCodeModule } from 'angularx-qrcode';

import {AngularFireModule}from '@angular/fire/compat';
//EL import de Storage

import{IonicStorageModule} from '@ionic/storage-angular';

//1.  vamos a agregar el modeulo de peticiones http: realizar peticiones api rest (json-xml):
import{HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
            IonicModule.forRoot(), 
            AppRoutingModule,
            //2. agregar el modulo a los imports del proyecto
            IonicStorageModule.forRoot(),
            //2. agregar el modulo a los imports:
            HttpClientModule,
            QRCodeModule,AngularFireModule.initializeApp(environment.firebaseConfig)

          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
