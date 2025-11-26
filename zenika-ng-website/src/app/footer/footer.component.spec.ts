import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../shared/services/api.service';
import { MockApiService } from '../shared/services/api.service.mock';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        {
          provide: ApiService,
          useValue: MockApiService,
        },
      ],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
