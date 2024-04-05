import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpApi } from './http-api';




@Injectable({
    providedIn: 'root'
})
export class AccountTypeService {
  AccountTypeList:any[]=[]
  loading=false
    constructor(private http: HttpClient) { }

    post(data: any) {
        return this.http.post<any>(`${environment.url}${HttpApi.Type}`, data);
      }
    //   find(){
    //     this.loading=true
    //      return this.http.get(`${environment.url}${HttpApi.Type}`).subscribe((data:AccountType[])=>{
    //       console.log(data)
    //       this.AccountTypeList=data;
    //       console.log("----Account type")
    //       console.log(this.AccountTypeList)
    //       this.loading=false
    //     })
    //   }
      getAll() {
        return this.http.get<any[]>(`${environment.url}${HttpApi.Type}`);
      }
     
      put(data: any , id: number) {
        return this.http.put<any>(HttpApi.Type + id , data);
      }
      delete(id: string) {
        return this.http.delete<any>(`${environment.url}${HttpApi.subType}` + id);
      }
      
      getById(id: number) {
        return this.http.get<any>(`${environment.url}${HttpApi.subType}` + id);
      }
}
