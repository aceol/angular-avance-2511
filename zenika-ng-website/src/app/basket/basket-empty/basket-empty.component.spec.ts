import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEmptyComponent } from './basket-empty.component';

describe('BasketEmptyComponent', () => {
  let component: BasketEmptyComponent;
  let fixture: ComponentFixture<BasketEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
