import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuckService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRandomImage(): Observable<{ url: string }> {
     
      var response = this.http.get<{ url: string }>(`${this.apiUrl}/random`).pipe(
        catchError((error) => {
          return throwError(() => new Error(`Api Error: ${error.message}`));
        })
      );
      return response;
  }

  getImagesByNumber(number: number): Observable<{ urls: string[] }> {
    
      var response = this.http.get<{ urls: string[] }>(`${this.apiUrl}/${number}`).pipe(
        catchError((error) => {
          return throwError(() => new Error(`Api Error: ${error.message}`));
        })
      );
      return response;
   
   
  }
}