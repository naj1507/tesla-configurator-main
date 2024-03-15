import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremierComponent } from './premier.component';
import { ModeleCarService } from '../../shared/services/modeleCar.service';
import { RecapService } from '../../shared/services/recap.service';
import { of } from 'rxjs';
import { Modele } from '../../shared/types/modele';
import { Couleur } from '../../shared/types/couleur';

describe('PremierComponent', () => {
  let component: PremierComponent;
  let fixture: ComponentFixture<PremierComponent>;
  let modeleCarServiceSpy: jasmine.SpyObj<ModeleCarService>;
  let recapServiceSpy: jasmine.SpyObj<RecapService>;

  beforeEach(async () => {
    const models: Modele[] = [{ code: 'model1', description: 'Model 1', colors: [], selected: false }];
    const colors: Couleur[] = [{ code: 'black', description: 'Black', price: 2000 }];

    const modeleCarService = jasmine.createSpyObj('ModeleCarService', ['getModels', 'getColors']);
    modeleCarService.getModels.and.returnValue(of(models));
    modeleCarService.getColors.and.returnValue(of(colors));

    const recapService = jasmine.createSpyObj('RecapService', ['setSelectedModel', 'setSelectedColor']);

    await TestBed.configureTestingModule({
      declarations: [ PremierComponent ],
      providers: [
        { provide: ModeleCarService, useValue: modeleCarService },
        { provide: RecapService, useValue: recapService }
      ]
    })
    .compileComponents();

    modeleCarServiceSpy = TestBed.inject(ModeleCarService) as jasmine.SpyObj<ModeleCarService>;
    recapServiceSpy = TestBed.inject(RecapService) as jasmine.SpyObj<RecapService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
