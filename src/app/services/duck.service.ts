import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuckService {
  private apiUrl = 'http://localhost:3000/api/ducks';

  constructor(private http: HttpClient) {}

  getRandomImage(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/random`);
  }

  getImagesByNumber(number: number): Observable<{ urls: string[] }> {
    return this.http.get<{ urls: string[] }>(`${this.apiUrl}/${number}`);
  }
}