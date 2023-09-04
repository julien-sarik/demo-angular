import { Injectable, inject } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HousingLocation } from './housinglocation';

// An Angular service is injectable to be used by other components
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly url = 'http://localhost:8081/locations';
  http = inject(HttpClient);

  constructor() { }

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url, {observe: 'body', responseType: 'json'});
  }
  
  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`, {observe: 'body', responseType: 'json'});
  }
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
