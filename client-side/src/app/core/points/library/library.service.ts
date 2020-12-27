import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Library } from './library.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(protected http: HttpClient) {}

  getLibraries() {
    return this.http.get(environment.apiBaseUrl + '/libraries');
  }

  deleteLibrary(id_library: string) {
    return this.http.delete(environment.apiBaseUrl + '/library/' + id_library);
  }

  addLibrary(library: Library) {
    return this.http.post(environment.apiBaseUrl + '/library/create', library);
  }
}
