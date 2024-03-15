import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigCarService {

    private apiUrl = '/options';

  constructor(private http: HttpClient) { }

   getConfig(modelCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${modelCode}`);
  }
}