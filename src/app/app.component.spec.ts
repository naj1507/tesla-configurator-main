import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ModeleCarService } from './shared/services/modeleCar.service';
import { RecapService } from './shared/services/recap.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let modeleCarService: jasmine.SpyObj<ModeleCarService>;
  let recapService: jasmine.SpyObj<RecapService>;

  beforeEach(async () => {
    const modeleCarServiceSpy = jasmine.createSpyObj('ModeleCarService', ['getSelectedModel']);
    const recapServiceSpy = jasmine.createSpyObj('RecapService', ['setSelectedColor', 'setSelectedConfig']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ModeleCarService, useValue: modeleCarServiceSpy },
        { provide: RecapService, useValue: recapServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    modeleCarService = TestBed.inject(ModeleCarService) as jasmine.SpyObj<ModeleCarService>;
    recapService = TestBed.inject(RecapService) as jasmine.SpyObj<RecapService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to step "un"', () => {
    spyOn(router, 'navigate');
    component.navigateToStep('un');
    expect(router.navigate).toHaveBeenCalledWith(['/etape-un']);
  });

  it('should navigate to step "deux" if model and color are selected', () => {
    spyOn(router, 'navigate');
    modeleCarService.getSelectedModel.and.returnValue(of(null));
    recapService.selectedColor = { code: 'grey', description: 'Grey', price: 100 };
    component.navigateToStep('deux');
    expect(router.navigate).toHaveBeenCalledWith(['/etape-deux']);
  });

  it('should show an alert if step "deux" is selected without model and color', () => {
    spyOn(window, 'alert');
    component.navigateToStep('deux');
    expect(window.alert).toHaveBeenCalledWith('Please select a model and a color first.');
  });

  it('should navigate to step "trois" if configuration is selected', () => {
    spyOn(router, 'navigate');
    recapService.selectedConfig = { id: 1, description: 'Config 1', range: 300, speed: 100, price: 50000 };
    component.navigateToStep('trois');
    expect(router.navigate).toHaveBeenCalledWith(['/etape-trois']);
  });
  

  it('should show an alert if step "trois" is selected without configuration', () => {
    spyOn(window, 'alert');
    component.navigateToStep('trois');
    expect(window.alert).toHaveBeenCalledWith('Please select a configuration first.');
  });

  it('should check if step "un" is active', () => {
    const routerStub = TestBed.inject(Router);
    spyOnProperty(routerStub, 'url', 'get').and.returnValue('/etape-un');
    expect(component.isActiveStep('un')).toBeTrue();
  });

  it('should check if step "deux" is active', () => {
    const routerStub = TestBed.inject(Router);
    spyOnProperty(routerStub, 'url', 'get').and.returnValue('/etape-deux');
    expect(component.isActiveStep('deux')).toBeTrue();
  });

  it('should check if step "trois" is active', () => {
    const routerStub = TestBed.inject(Router);
    spyOnProperty(routerStub, 'url', 'get').and.returnValue('/etape-trois');
    expect(component.isActiveStep('trois')).toBeTrue();
  });

  it('should check if step "un" is available', () => {
    expect(component.isStepAvailable('un')).toBeTrue();
  });

  it('should check if step "deux" is available with selected model and color', () => {
    modeleCarService.getSelectedModel.and.returnValue(of(null));
    recapService.selectedColor = { code: 'grey', description: 'Grey', price: 100 };
    expect(component.isStepAvailable('deux')).toBeTrue();
  });

  it('should check if step "trois" is available with selected configuration', () => {
    recapService.selectedConfig = { id: 1, description: 'Config 1', range: 300, speed: 100, price: 50000 };
    recapService.selectedColor = { code: 'grey', description: 'Grey', price: 100 };
    expect(component.isStepAvailable('trois')).toBeTrue();
  });

  it('should check if step "trois" is not available without selected configuration', () => {
    expect(component.isStepAvailable('trois')).toBeFalse();
  });
});
