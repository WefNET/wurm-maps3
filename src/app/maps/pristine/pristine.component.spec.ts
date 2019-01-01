import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PristineComponent } from './pristine.component';

describe('PristineComponent', () => {
  let component: PristineComponent;
  let fixture: ComponentFixture<PristineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PristineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PristineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
