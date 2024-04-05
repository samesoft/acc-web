import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Account } from './Account';


@Injectable({
  providedIn: 'root',
})
export class userService {

  constructor(private http: HttpClient) { }
 
  post(data: any) {
    return this.http.post<any>(`${environment.url}user/register`, data);
  }
  Reset(data: any) {
    return this.http.post<any>(`${environment.url}transaction/reset`, data);
  }
  getAll() {
    return this.http.get<User[]>(`${environment.url}user/list`);
  }
  
  getAllAccounts() {
    return this.http.get<any[]>(`${environment.url}accounts`);
  }
  delete(id: number) {
    return this.http.delete<Account>(`${environment.url}accounts/` + id);
  }
  getAllRoles() {
    return this.http.get<any[]>(`${environment.url}user/roles`);
  }
 
}
