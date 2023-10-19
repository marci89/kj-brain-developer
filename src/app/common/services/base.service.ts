import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// Base service class for services
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = environment.apiUrl;

  constructor() { }

  // Helper function to build HttpParams
  protected createParams(filter: any): HttpParams {

    let params = new HttpParams();
    for (const key in filter) {
      if (filter[key] !== null && filter[key] !== undefined) {
        params = params.set(key, filter[key].toString());
      }
    }
    return params;
  }
}
