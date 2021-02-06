import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { CreatePageModule } from './create/create.module';
import { DetailsPageModule } from './details/details.module';
import { EditPageModule } from './edit/edit.module';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot({
      name: '__songsdb', // <-- Este es el nombre de la base de datos
      driverOrder: ['indexedb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(),
    CreatePageModule,
    DetailsPageModule,
    EditPageModule,
    HomePageModule
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
