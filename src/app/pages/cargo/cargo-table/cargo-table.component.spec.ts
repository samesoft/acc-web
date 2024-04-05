import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTableComponent } from './cargo-table.component';

describe('CargoTableComponent', () => {
  let component: CargoTableComponent;
  let fixture: ComponentFixture<CargoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
