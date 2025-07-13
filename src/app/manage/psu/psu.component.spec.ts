import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsuComponent } from './psu.component';

describe('PsuComponent', () => {
  let component: PsuComponent;
  let fixture: ComponentFixture<PsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
