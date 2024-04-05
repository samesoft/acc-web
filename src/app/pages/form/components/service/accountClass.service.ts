import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApi } from './http-api';
import { environment } from 'src/environments/environment';






@Injectable({
    providedIn: 'root'
})
export class AccountClassService {

    constructor(private http: HttpClient) { }

    post(data: any) {
        return this.http.post<any>(HttpApi.accountclass, data);
      }
      getAll() {
        return this.http.get<any[]>(`${environment.url}${HttpApi.accountclass}`);
      }
     
      put(data: any, id: number) {
        return this.http.put<any>(HttpApi.accountclass + id, data);
      }
      delete(id: number) {
        return this.http.delete<any>(HttpApi.accountclass + id);
      }
      getById(id: number) {
        return this.http.get<any>(HttpApi.accountclass + id);
      }
}
