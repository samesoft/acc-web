import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportJournalComponent } from './import-journal.component';

describe('ImportJournalComponent', () => {
  let component: ImportJournalComponent;
  let fixture: ComponentFixture<ImportJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
