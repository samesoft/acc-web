import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUsageComponent } from './property-usage.component';

describe('PropertyUsageComponent', () => {
  let component: PropertyUsageComponent;
  let fixture: ComponentFixture<PropertyUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
