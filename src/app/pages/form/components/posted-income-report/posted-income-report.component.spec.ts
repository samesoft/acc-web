import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedIncomeReportComponent } from './posted-income-report.component';

describe('PostedIncomeReportComponent', () => {
  let component: PostedIncomeReportComponent;
  let fixture: ComponentFixture<PostedIncomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostedIncomeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostedIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
