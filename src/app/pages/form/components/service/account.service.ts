import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../user-list/Account';
import { environment } from 'src/environments/environment';
import { HttpApi } from './http-api';




// export type EntityResponseType = HttpResponse<Account>;
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  AccountList:Account[]=[]
  loading=false
  
  constructor(private http: HttpClient) { }

  // getPrivileges(){
  //   this.loading=true
  
  //   this.http.get<any[]>(HttpApi.account).subscribe((data:Account[])=>{
  //     this.AccountList=data['Accounts']
  //     this.loading=false
  //   })
  //  }
  post(data: Account) {
    return this.http.post<Account>(`${environment.url}${HttpApi.account}`, data);
  }
  
 
  getAll() {
    return this.http.get<Account[]>(`${environment.url}${HttpApi.account}`);
  }
  postExcelData(data: any){
    return this.http.post<any>(`${environment.url}${HttpApi.account}` ,data);
  }
  put(data: Account, id: number) {
    return this.http.put<Account>(`${environment.url}${HttpApi.account}` + id, data);
  }
  delete(id: number) {
    return this.http.delete<Account>(`${environment.url}${HttpApi.account}` + id);
  }
  getById(id: number) {
    return this.http.get<Account>(`${environment.url}${HttpApi.account}` + id);
  }
  getAccountTypeByAccountClass(id: string){
    return this.http.get<any>(HttpApi.Type + id); 
  }
  getAccountSubTypeByAccountType(id: string){
    return this.http.get<any>(HttpApi.subType + id); 
  }
  editAccountJournal(data: any) {
    return this.http.post<Account>(`${environment.url}transaction/update-entry-account`, data);
  }
}
