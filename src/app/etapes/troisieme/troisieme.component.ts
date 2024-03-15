import { Component, OnInit } from '@angular/core';
import { RecapService } from '../../shared/services/recap.service';

@Component({
  selector: 'app-troisieme',
  templateUrl: './troisieme.component.html',
  styleUrls: ['./troisieme.component.scss']
})
export class TroisiemeComponent implements OnInit {

  readonly OPTION_PRICE = 1000;

  constructor(public recapService: RecapService) {}

  ngOnInit(): void {
  }
  getTotalCost(): number {
    let totalCost = 0;
    if (this.recapService.selectedConfig) {
      totalCost += this.recapService.selectedConfig.price;
    }
    if (this.recapService.selectedColor) {
      totalCost += this.recapService.selectedColor.price;
    }
    if (this.recapService.towHitch) {
      totalCost += this.OPTION_PRICE;
    }

    if (this.recapService.yoke) {
      totalCost += this.OPTION_PRICE;
    }
    this.recapService.totalCost = totalCost;
    return totalCost;
  }
  getUrl(): string {
    if (this.recapService.selectedModel && this.recapService.selectedColor) {
      return `https://interstate21.com/tesla-app/images/${this.recapService.selectedModel.code}/${this.recapService.selectedColor.code}.jpg`;
    } else {
      return ''; 
    }
  }
}


