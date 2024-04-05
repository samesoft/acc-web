import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalStatmentComponent } from './journal-statment.component';

describe('JournalStatmentComponent', () => {
  let component: JournalStatmentComponent;
  let fixture: ComponentFixture<JournalStatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalStatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalStatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
