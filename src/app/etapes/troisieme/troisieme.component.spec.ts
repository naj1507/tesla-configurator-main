import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecapService } from '../../shared/services/recap.service';
import { TroisiemeComponent } from './troisieme.component';

describe('TroisiemeComponent', () => {
  let component: TroisiemeComponent;
  let fixture: ComponentFixture<TroisiemeComponent>;
  let recapService: RecapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TroisiemeComponent],
      imports: [HttpClientTestingModule],
      providers: [RecapService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroisiemeComponent);
    component = fixture.componentInstance;
    recapService = TestBed.inject(RecapService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total cost correctly', () => {
    recapService.selectedConfig = { id: 1, description: 'Config 1', range: 300, speed: 100, price: 50000 };
    recapService.selectedColor = { code: 'black', description: 'Black', price: 2000 };
    recapService.yoke = true;
    recapService.towHitch = false;
    const totalCost = component.getTotalCost();
    expect(totalCost).toEqual(53000);
  });

  it('should return correct image URL', () => {
    recapService.selectedModel = { code: 'model1', description: 'Model 1', colors: [], selected: false };
    recapService.selectedColor = { code: 'black', description: 'Black', price: 2000 };
    const url = component.getUrl();
    expect(url).toEqual('https://interstate21.com/tesla-app/images/model1/black.jpg');
  });

});
