import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoReportComponent } from './cargo-report.component';

describe('CargoReportComponent', () => {
  let component: CargoReportComponent;
  let fixture: ComponentFixture<CargoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
