import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgeDataService {

  constructor(private http: HttpClient) { }

  requestData(): Observable<any[]> {
    const resp1 = this.http.get('http://5c37c33f7820ff0014d927c5.mockapi.io/msr/ages');
    const resp2 = this.http.get('http://5c37c33f7820ff0014d927c5.mockapi.io/msr/names');
    return forkJoin([resp1, resp2]);
  }
}
