import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from '../types/options';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigCarService {

    private apiUrl = '/options';

  constructor(private http: HttpClient) { }

   getConfig(modelCode: string): Observable<Options> {
    return this.http.get<Options>(`${this.apiUrl}/${modelCode}`);
  }
}