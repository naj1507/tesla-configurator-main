import { Routes } from '@angular/router';
import { PremierComponent } from './etapes/premier/premier.component';
import { DeuxiemeComponent } from './etapes/deuxieme/deuxieme.component';
import { TroisiemeComponent } from './etapes/troisieme/troisieme.component';

export const APP_ROUTES: Routes = [
  { path: 'etape-un', component: PremierComponent },
  { path: 'etape-deux', component: DeuxiemeComponent },
  { path: 'etape-trois', component: TroisiemeComponent},
  { path: '', redirectTo: '/etape-un', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/etape-un' } 
]

