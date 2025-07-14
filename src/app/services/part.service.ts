import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private baseUrl = 'http://localhost:8080/api'; // Your Spring Boot API base

  constructor(private http: HttpClient) {}

  /**
   * Generic method to fetch parts by type
   * @param type 'processor', 'ram', 'psu', etc.
   */
  getParts(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${type}`);
  }
}
