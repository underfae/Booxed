import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookshelfDialogComponent } from './create-bookshelf-dialog.component';

describe('CreateBookshelfDialogComponent', () => {
  let component: CreateBookshelfDialogComponent;
  let fixture: ComponentFixture<CreateBookshelfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookshelfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookshelfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
