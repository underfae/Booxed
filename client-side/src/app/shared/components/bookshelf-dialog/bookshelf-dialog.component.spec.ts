import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelfDialogComponent } from './bookshelf-dialog.component';

describe('BookshelfDialogComponent', () => {
  let component: BookshelfDialogComponent;
  let fixture: ComponentFixture<BookshelfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
