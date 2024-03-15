import { Component, OnInit } from '@angular/core';
import { ModeleCarService } from '../../shared/services/modeleCar.service';
import { Modele } from '../../shared/types/modele';
import { RecapService } from '../../shared/services/recap.service';
import { Couleur } from '../../shared/types/couleur';

@Component({
  selector: 'app-premier',
  templateUrl: './premier.component.html',
  styleUrls: ['./premier.component.scss']
})
export class PremierComponent implements OnInit {
  models: Modele[] = []; 
  colors: string[] = []; 
  selectedModel: Modele | null = null;
  selectedColor: Couleur | null = null; 
  constructor(private modeleCarService: ModeleCarService,private recapService: RecapService) { }

  ngOnInit() {
    this.fetchModelsAndColors();
      if (this.recapService.selectedModel) {
        this.selectedModel = this.recapService.selectedModel;
      }
      if (this.recapService.selectedColor) {
        this.selectedColor = this.recapService.selectedColor;
      }
    

  }

  fetchModelsAndColors() {
    this.modeleCarService.getModels().subscribe(models => {
      this.models = models;
    });

    this.modeleCarService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  onSelectModel(event: Event) {
    const selectedModelCode = (event.target as HTMLSelectElement).value;
    const previousModel = this.selectedModel; 
    this.selectedModel = this.models.find(model => model.code === selectedModelCode) || null;
  
    if (this.selectedModel && previousModel && this.selectedModel.code !== previousModel.code) {
      this.recapService.selectedConfig = null;
      this.recapService.setYokeOption(false);
      this.recapService.setTowHitchOption(false);
    }
  
    if (this.selectedModel) {    
      this.modeleCarService.setSelectedModel(this.selectedModel);
      this.recapService.selectedModel = this.selectedModel;
    }
  }
  

  onSelectColor(event: Event) {
    const colorCode = (event.target as HTMLSelectElement).value;
    const previousColor = this.selectedColor; 
    this.selectedColor = this.selectedModel?.colors.find(color => color.code === colorCode) || null;
  
    if (this.selectedColor && previousColor && this.selectedColor.code !== previousColor.code) {
      this.recapService.selectedConfig = null;
      this.recapService.setYokeOption(false);
      this.recapService.setTowHitchOption(false);
    }
  
    if (this.selectedColor) {
      this.recapService.selectedColor = this.selectedColor;
    }
  }
  

  getUrl(): string {
    if (this.selectedModel && this.selectedColor) {
      return `https://interstate21.com/tesla-app/images/${this.selectedModel.code}/${this.selectedColor.code}.jpg`;
    } else {
      return ''; 
    }
  }
}