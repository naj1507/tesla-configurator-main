import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeuxiemeComponent } from './deuxieme.component';
import { ConfigCarService } from '../../shared/services/configCar.service';
import { ModeleCarService } from '../../shared/services/modeleCar.service';
import { RecapService } from '../../shared/services/recap.service';
import { of } from 'rxjs';

describe('DeuxiemeComponent', () => {
  let component: DeuxiemeComponent;
  let fixture: ComponentFixture<DeuxiemeComponent>;
  let configCarService: ConfigCarService;
  let modeleCarService: ModeleCarService;
  let recapServiceSpy: jasmine.SpyObj<RecapService>; // Utiliser recapServiceSpy

  beforeEach(async () => {
    const recapService = jasmine.createSpyObj('RecapService', ['setYokeOption', 'setTowHitchOption']);
    await TestBed.configureTestingModule({
      declarations: [DeuxiemeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ConfigCarService,
        ModeleCarService,
        { provide: RecapService, useValue: recapService } // Utiliser RecapService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeuxiemeComponent);
    component = fixture.componentInstance;
    configCarService = TestBed.inject(ConfigCarService);
    modeleCarService = TestBed.inject(ModeleCarService);
    recapServiceSpy = TestBed.inject(RecapService) as jasmine.SpyObj<RecapService>; // Casting à jasmine.SpyObj<RecapService>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch configurations on initialization', () => {
    const mockOptions = {
      configs: [{ id: 1, description: 'Config 1', range: 300, speed: 100, price: 50000 }],
      yoke: true,
      towHitch: false
    };
    spyOn(modeleCarService, 'getSelectedModel').and.returnValue(of({ code: 'XYZ', description: 'Model XYZ', colors: [], selected: false }));
    spyOn(configCarService, 'getConfig').and.returnValue(of(mockOptions));
    component.ngOnInit();
    expect(configCarService.getConfig).toHaveBeenCalledOnceWith('XYZ');
    expect(component.configs).toEqual(mockOptions.configs);
    expect(component.options).toEqual(mockOptions);
  });

  it('should update option availability based on fetched options', () => {
    const mockOptions = {
      configs: [{ id: 1, description: 'Config 1', range: 300, speed: 100, price: 50000 }],
      yoke: true,
      towHitch: false
    };
    component.options = mockOptions;
    component.updateOptionAvailability();
    expect(component.yokeOptionAvailable).toBeTrue();
    expect(component.towHitchOptionAvailable).toBeFalse();
  });

  it('should return correct image URL', () => {
    recapServiceSpy.selectedModel = { code: 'model1', description: 'Model 1', colors: [], selected: false };
    recapServiceSpy.selectedColor = { code: 'black', description: 'Black', price: 2000 };
    const url = component.getUrl();
    expect(url).toEqual('https://interstate21.com/tesla-app/images/model1/black.jpg');
  });
});
