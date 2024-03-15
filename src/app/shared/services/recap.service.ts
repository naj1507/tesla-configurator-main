import { Injectable } from '@angular/core';
import { Config } from '../types/config';
import { Couleur } from '../types/couleur';
import { Modele } from '../types/modele';


@Injectable({
  providedIn: 'root'
})
export class RecapService {

    selectedModel: Modele | null = null;
    selectedConfig: Config | null = null;
    selectedColor: Couleur | null = null;
    yoke: boolean = false;
    towHitch: boolean = false;
    totalCost: number = 0;
    setYokeOption(value: boolean) {
        this.yoke = value;
    }
    
    setTowHitchOption(value: boolean) {
        this.towHitch = value;
    }

} 