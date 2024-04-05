import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { ListJsModel } from '../../tables/listjs/listjs.model';
import { Observable } from 'rxjs';
import { NgbdOrdersSortableHeader } from '../../tables/listjs/listjs-sortable.directive';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EditCargoComponent } from '../edit-cargo/edit-cargo.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cargo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargo-table.component.html',
  styleUrl: './cargo-table.component.scss'
})
export class CargoTableComponent   {
  totalSchedules: number = 0;
  itemsPerPage: number = 10;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  Form!: FormGroup;
  ListJsData!: ListJsModel[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;

  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;

  // Table data
  ListJsList!: Observable<ListJsModel[]>;
  
  @ViewChildren(NgbdOrdersSortableHeader) headers!: QueryList<NgbdOrdersSortableHeader>;

  schedules: any[] = [];
  parties: any[] = [];
  cities: any[] = [];
  constructor(private http: HttpClient, private dialog:MatDialog, private modalService: NgbModal, private formBuilder: FormBuilder) {
}
ngOnInit(){
  this.getData();
  this.getParties();
  this.getCities();

  this.Form = this.formBuilder.group({
    ids: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    // phone: ['', [Validators.required]],
    // date: ['', [Validators.required]],
    // status: ['', [Validators.required]]
  });

  
}
get form() {
  return this.Form.controls;
}

getData() {
  this.http
    .get<any[]>(`${environment.url}schedule`)
    .subscribe(data => {
      this.schedules = data;
      console.log(data);
    });
}

getParties() {
  this.http
    .get<any[]>(`${environment.url}party/list`)
    .subscribe(data => {
      this.parties = data;
      console.log(data);
    });
}
getPartyName(partyId: string): string {
  const party = this.parties.find((p) => p.Party_ID === partyId);
  return party ? party.Name : 'Unknown';
}
getCityName(cityId: string): string {
  const city = this.cities.find((p) => p.CityID === cityId);
  return city ? city.City_Name : 'Unknown';
}
getCities() {
  this.http
    .get<any[]>(`${environment.url}city`)
    .subscribe(data => {
      this.cities = data;
      console.log(data);
    });
}



editModal(item: any) {
  this.submitted = false;
  this.modalService.open(item, { size: 'md', centered: true });
  
}
openModal(item: any) {
  this.submitted = false;
  this.modalService.open(item, { size: 'md', centered: true });
}

editSchedule(data: any) {
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? "80%" : "50%";
  this.dialog
    .open(EditCargoComponent, {
      data: {
        schedule: data,
      },
      width: width,
    })
    .afterClosed()
    .subscribe((result) => {
      this.ngOnInit();
    });
}
AddUser() {
  this.dialog
    .open(EditCargoComponent, {
      width: "30%",
    })
    .afterClosed()
    .subscribe((result) => {
      this.ngOnInit();
    });
}

}
