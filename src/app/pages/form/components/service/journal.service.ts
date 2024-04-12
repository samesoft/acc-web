import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApi } from './http-api';
import { Observable } from 'rxjs';






@Injectable({
    providedIn: 'root'
})
export class JournalService {
 
  loading=false
    constructor(private http: HttpClient) { }

    Import(data: any) {
        return this.http.post<any>(`${environment.url}${HttpApi.ImportJournal}`, data);
      }
    
   
}
