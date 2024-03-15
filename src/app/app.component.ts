import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModeleCarService } from './shared/services/modeleCar.service';
import { RecapService } from './shared/services/recap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private modeleCarService: ModeleCarService,
    private recapService: RecapService
  ) {}

  navigateToStep(step: string) {
    if (step === 'un') {
      this.router.navigate(['/etape-un']);
    } else if (step === 'deux') {
      if (this.modeleCarService.getSelectedModel() && this.recapService.selectedColor) {
        this.router.navigate(['/etape-deux']);
      } else {
        alert("Please select a model and a color first.");
      }
    } else if (step === 'trois') {
      if (this.recapService.selectedConfig) {
        this.router.navigate(['/etape-trois']);
      } else {
        alert("Please select a configuration first.");
      }
    }
  }

  isActiveStep(step: string): boolean {
    const currentPath = this.router.url;
    return currentPath.includes(`etape-${step}`);
  }

  isStepAvailable(step: string): boolean {
    if (step === 'un') {
      return true;
    } else if (step === 'deux') {
      return !!this.modeleCarService.getSelectedModel() && !!this.recapService.selectedColor;
    } else if (step === 'trois') {
      return !!this.recapService.selectedConfig;
    }
    return false;
  }
}
