import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedAndReadComponent } from './liked-and-read.component';

describe('LikedAndReadComponent', () => {
  let component: LikedAndReadComponent;
  let fixture: ComponentFixture<LikedAndReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedAndReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedAndReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
