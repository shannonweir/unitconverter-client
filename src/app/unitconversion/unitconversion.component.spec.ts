import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitconversionComponent } from './unitconversion.component';

describe('UnitconversionComponent', () => {
  let component: UnitconversionComponent;
  let fixture: ComponentFixture<UnitconversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitconversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitconversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
