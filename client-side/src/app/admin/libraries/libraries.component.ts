import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Library } from '../../core/points/library/library.model';
import { LibraryService } from '../../core/points/library/library.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
})
export class LibrariesComponent implements OnInit {
  libraries: Library[] = [];
  library = new Library();
  serverErrors: string;
  constructor(
    protected libraryService: LibraryService,
    protected snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.libraryService.getLibraries().subscribe((result: Library[]) => {
      this.libraries = result;
    });
  }

  newLibrary = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    building_number: new FormControl('', [Validators.required]),
    apartment_number: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
  });

  addLibrary() {
    Object.assign(this.library, this.newLibrary.value);

    this.libraryService.addLibrary(this.library).subscribe(
      () => {
        this.libraries.push(this.library);
        this.cdr.detectChanges();
        this.snackBar.open('Library succesfully added.', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        error.status === 422
          ? (this.serverErrors = error.error)
          : (this.serverErrors = 'Something went wrong. Try again.');
        this.snackBar.open(this.serverErrors, 'OK', { duration: 4000 });
      }
    );
  }

  deleteLibrary(library_id: string) {
    if (library_id) {
      this.libraryService.deleteLibrary(library_id).subscribe(
        () => {
          this.snackBar.open('Library succesfully deleted', 'OK', {
            duration: 2000,
          });
          this.libraries.splice(
            this.libraries.findIndex(function (i) {
              return i._id === library_id;
            }),
            1
          );
        },
        () => {
          this.snackBar.open('Could not delete library', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}
