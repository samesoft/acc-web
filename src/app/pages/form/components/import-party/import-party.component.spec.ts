import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPartyComponent } from './import-party.component';

describe('ImportPartyComponent', () => {
  let component: ImportPartyComponent;
  let fixture: ComponentFixture<ImportPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPartyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
