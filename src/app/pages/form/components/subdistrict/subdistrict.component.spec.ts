import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdistrictComponent } from './subdistrict.component';

describe('SubdistrictComponent', () => {
  let component: SubdistrictComponent;
  let fixture: ComponentFixture<SubdistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdistrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubdistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
