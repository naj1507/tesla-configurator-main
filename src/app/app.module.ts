import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ModeleCarService } from './shared/services/modeleCar.service';
import { APP_ROUTES } from './app.routes'; 
import { PremierComponent } from './etapes/premier/premier.component';
import { ConfigCarService } from './shared/services/configCar.service';
import { FormsModule } from '@angular/forms';
import { DeuxiemeComponent } from './etapes/deuxieme/deuxieme.component';
import { TroisiemeComponent } from './etapes/troisieme/troisieme.component';
import { RecapService } from './shared/services/recap.service';

@NgModule({
  declarations: [
    AppComponent,
    PremierComponent,
    DeuxiemeComponent,
    TroisiemeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(APP_ROUTES), 
  ],
  providers: [
    ModeleCarService,
    ConfigCarService,
    RecapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
