import { Component, OnInit } from '@angular/core';
import { Config } from '../../shared/types/config';
import { ConfigCarService } from '../../shared/services/configCar.service';
import { ModeleCarService } from '../../shared/services/modeleCar.service';
import { Options } from '../../shared/types/options';
import { RecapService } from '../../shared/services/recap.service';


@Component({
  selector: 'app-deuxieme',
  templateUrl: './deuxieme.component.html',
  styleUrls: ['./deuxieme.component.scss']
})
export class DeuxiemeComponent implements OnInit {

  configs: Config[] = []; 
  selectedConfig: Config | null = null;
  yokeOptionAvailable: boolean = false;
  towHitchOptionAvailable: boolean = false;
  yokeOptionSelected: boolean = false;
  towHitchOptionSelected: boolean = false;
  options?: Options;

  constructor(private configService: ConfigCarService, private modeleCarService: ModeleCarService,public recapService: RecapService) { }

  ngOnInit() {
      this.modeleCarService.getSelectedModel().subscribe(selectedModel => {
        if (selectedModel) {
          const modelCode = selectedModel.code;
          this.fetchConfigs(modelCode);
        }
      });
  
      if (this.recapService.selectedConfig) {
        this.selectedConfig = this.recapService.selectedConfig;
      }
      this.yokeOptionSelected = this.recapService.yoke;
      this.towHitchOptionSelected = this.recapService.towHitch;
  }

  fetchConfigs(modelCode: string) {
    this.configService.getConfig(modelCode).subscribe((options: Options) => {

      this.options = options;
      this.configs = options.configs;
      this.updateOptionAvailability();

    });
  }

  onSelectConfig() {
    const selectedConfigId = (document.getElementById('configSelect') as HTMLSelectElement).value;
    this.selectedConfig = this.configs.find(config => config.id === parseInt(selectedConfigId, 10)) || null;
    this.recapService.selectedConfig = this.selectedConfig;

  }

  updateOptionAvailability() {
    if (this.options) {
      this.yokeOptionAvailable = this.options.yoke ?? false;
      this.towHitchOptionAvailable = this.options.towHitch ?? false;
    }
  }

  onCheckboxChange(option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (option === 'yoke') {
      this.recapService.setYokeOption(checked);
    } else if (option === 'towHitch') {
      this.recapService.setTowHitchOption(checked);
    }
  }

  getUrl(): string {
    if (this.recapService.selectedModel && this.recapService.selectedColor) {
      return `https://interstate21.com/tesla-app/images/${this.recapService.selectedModel.code}/${this.recapService.selectedColor.code}.jpg`;
    } else {
      return ''; 
    }
  }
}