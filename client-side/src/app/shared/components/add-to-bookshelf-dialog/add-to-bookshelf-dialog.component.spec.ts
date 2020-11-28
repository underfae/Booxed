import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBookshelfDialogComponent } from './add-to-bookshelf-dialog.component';

describe('AddToBookshelfDialogComponent', () => {
  let component: AddToBookshelfDialogComponent;
  let fixture: ComponentFixture<AddToBookshelfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToBookshelfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBookshelfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
