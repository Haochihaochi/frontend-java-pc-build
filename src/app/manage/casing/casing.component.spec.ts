import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasingComponent } from './casing.component';

describe('CasingComponent', () => {
  let component: CasingComponent;
  let fixture: ComponentFixture<CasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CasingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
