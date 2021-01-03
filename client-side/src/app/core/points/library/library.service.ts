import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Library } from './library.model';
import { environment } from '../../../../environments/environment';

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
