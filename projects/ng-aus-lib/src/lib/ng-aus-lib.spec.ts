import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAusLib } from './ng-aus-lib';

describe('NgAusLib', () => {
  let component: NgAusLib;
  let fixture: ComponentFixture<NgAusLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgAusLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgAusLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
