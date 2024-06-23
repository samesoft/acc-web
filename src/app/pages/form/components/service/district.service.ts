import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpApi } from "./http-api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DistrictService {
  AccountSubTypeList: any[] = [];
  loading = false;
  constructor(private http: HttpClient) {}

  post(data: any) {
    return this.http.post<any>(`${environment.url}${HttpApi.subType}`, data);
  }

  getAll() {
    return this.http.get<any[]>(`${environment.url}${HttpApi.subType}`);
  }
  //   find(){
  //     this.loading=true
  //      return this.http.get(`${environment.url}${HttpApi.subType}`).subscribe((data:AccountSubTypes[])=>{
  //       console.log(data)
  //       this.AccountSubTypeList=data;
  //       console.log(this.AccountSubTypeList)
  //       this.loading=false
  //     })
  //   }
//   put(data: any, id: number) {
//     return this.http.put<any>(
//       `${environment.url}${HttpApi.subType}` + id,
//       data
//     );
//   }
  delete(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.DistrictDelete}` + id
    );
  }
  deleteSubDistrict(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.SubdistrictDelete}` + id
    );
  }
  deletePropertyTypes(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.PropertyTypeDelete}` + id
    );
  }
  deletePropertyUsage(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.PropertyUsageDelete}` + id
    );
  }
  put( id: number, data: any) {
    return this.http.put<any>( `${environment.url}${HttpApi.DistrictDelete}` + id, data);
  }
  deleteProperty(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.PropertyDelete}` + id
    );
  }
  deleteJournal(data: any) {
    return this.http.post<any>(
      `${environment.url}${HttpApi.JournalDelete}`,
      data
    );
  }
  deleteT(journal_id: any): Observable<any> {
    return this.http.post(`${environment.url}${HttpApi.journalDelete}`, {
      body: { journal_id },
    });
  }
  deleteParty(partyId: any): Observable<any> {
    return this.http.delete(`${environment.url}${HttpApi.PartyDelete}`, {
      body: { partyId },
    });
  }
  getById(id: number) {
    return this.http.get<any>(`${environment.url}${HttpApi.subType}` + id);
  }

  deleteCargoReport(id: number) {
    return this.http.delete<any>(
      `${environment.url}${HttpApi.CargoDelete}` + id
    );
  }

  
  getSubdistrictByDistrict(id: string){
    return this.http.get<any>(HttpApi.GetSubdistrictByDistrict + id); 
  }
}
