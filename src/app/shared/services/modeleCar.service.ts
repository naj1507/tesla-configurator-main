import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modele } from '../types/modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleCarService {
  private modelsEndpoint = '/models';

  private models: Modele[] = [];
  private colors: string[] = [];

  private models$ = new BehaviorSubject<Modele[]>([]);
  private colors$ = new BehaviorSubject<string[]>([]);
  private selectedModel$ = new BehaviorSubject<Modele | null>(null); 

  constructor(private http: HttpClient) { }

  getModels(): Observable<Modele[]> {
    if (this.models.length > 0) {
      this.models$.next(this.models);
    } else {
      this.http.get<Modele[]>(this.modelsEndpoint).subscribe(models => {
        this.models = models;
        this.models$.next(models);
      });
    }
    return this.models$.asObservable();
  }

  getColors(): Observable<string[]> {
    if (this.colors.length > 0) {
      this.colors$.next(this.colors);
    } else {
      this.http.get<string[]>(this.modelsEndpoint).subscribe(colors => {
        this.colors = colors;
        this.colors$.next(colors);
      });
    }
    return this.colors$.asObservable();
  }

  getSelectedModel(): Observable<Modele | null> {
    return this.selectedModel$.asObservable();
  }

  setSelectedModel(model: Modele| null): void {
    this.models.forEach(m => m.selected = false);
    if (model) {
      this.selectedModel$.next(model);
      model.selected = true;
    }
  }
}
