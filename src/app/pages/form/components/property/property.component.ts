import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/pages/icons/toast-service';
import { environment } from 'src/environments/environment';
import { AccountSubTypeService } from '../service/accountSubType.service';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent {
  PropertyForm!: FormGroup;
  properties: any[] = [];
  propertyType: any[]= [];
  propertyUsage: any[]= [];
  district: any[]= [];
  subdistrict: any[]= [];
  partyTypes: string[] = ["Employee", "Customer", "Vendor"];
  isLoading = false;
  submitted = false;
  isPosting = false;
  showEditToast = false;

  showAddToast = false;
  editFormFieldValue: any;
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  page: any = 1;

  paginationDatas: any;

  showSuccessToast = false;
  startIndex: number = 0;
  endIndex: number = 10;
  totalRecords: number = 0;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    public toastService: ToastService,
    public service : AccountSubTypeService
  ) {}

  ngOnInit(): void {
    this.PropertyForm = this.formBuilder.group({
      Party_Type: ["", Validators.required],
      Property_No: ["", Validators.required],
      Property_Name: ["", Validators.required],
      House_Nbr: ["", Validators.required],
      Property_Type: ["", Validators.required],
      Property_usage: ["", Validators.required],
      Tenant_Name: ["", Validators.required],
      Mobile: ["", Validators.required],
      Property_Owner: ["", Validators.required],
      Owner_Mobile: ["", Validators.required],
      District: ["", Validators.required],
      Sub_District: ["", Validators.required],
      amount: ["", Validators.required],
      P_Period: ["", Validators.required],
      P_Year: ["", Validators.required],
      Pro_Is_Mon: false,
      Pro_Is_Apr:false,
      longitude: ["", Validators.required],
      latitude: ["", Validators.required],
    });

   
    this.fetchPropertyList();
    this.fetchPropertyTypeList();
    this.fetchPropertyUsageList();
    this.fetchDistrictList();
    this.fetchSubdistrictList();

  }

  fetchPropertyList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}property`).subscribe((data) => {
      this.properties = data;
      console.log(data);
      this.isLoading = false;
    });
  }
  fetchPropertyTypeList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}propertyType`).subscribe((data) => {
      this.propertyType = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  fetchPropertyUsageList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}propertyUsage`).subscribe((data) => {
      this.propertyUsage = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  fetchDistrictList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}district`).subscribe((data) => {
      this.district = data;
      console.log(data);
      this.isLoading = false;
    });
  }
  fetchSubdistrictList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}subDistrict`).subscribe((data) => {
      this.subdistrict = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  getSubdistrictByDistrict(Id: any) {
    this.http.get<any[]>(`${environment.url}SubDistrict/` + Id).subscribe((data) => {
        this.subdistrict = data;
        console.log(this.subdistrict);
      });
  }

  createProperty(): void {
    // this.isPosting = true;
    this.PropertyForm.markAllAsTouched();
    if (this.PropertyForm.valid) {
      this.isLoading = true;
      const url = `${environment.url}property`;
      const data = {
        Party_Type: this.PropertyForm.value.Party_Type,
        Property_No: this.PropertyForm.value.Property_No,
        Property_Name: this.PropertyForm.value.Property_Name,
        House_Nbr: this.PropertyForm.value.House_Nbr,
        Property_Type: this.PropertyForm.value.Property_Type,
        Property_usage: this.PropertyForm.value.Property_usage,
        Tenant_Name: this.PropertyForm.value.Tenant_Name,
        Mobile: this.PropertyForm.value.Mobile,
        Property_Owner: this.PropertyForm.value.Property_Owner,
        Owner_Mobile: this.PropertyForm.value.Owner_Mobile,
        District: this.PropertyForm.value.District,
        Sub_District: this.PropertyForm.value.Sub_District,
        amount: this.PropertyForm.value.amount,
        P_Period: this.PropertyForm.value.P_Period,
        P_Year: this.PropertyForm.value.P_Year,
        Pro_Is_Mon: this.PropertyForm.value.Pro_Is_Mon,
        Pro_Is_Apr: this.PropertyForm.value.Pro_Is_Apr,
        longitude: this.PropertyForm.value.longitude,
        latitude: this.PropertyForm.value.latitude,
      };
      this.http.post(url, data).subscribe((response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.toastService.show("Successfully.", {
          classname: "bg-success text-center text-white",
          delay: 5000,
        });
        this.isLoading = false;
        this.ngOnInit();
      });
    } else {
      this.isLoading = false;
    }
  }
  party: any;
  confirm(party: any, id: any) {
    this.party = id;
    this.modalService.open(party, { centered: true });
  }

  EditParty(): void {
    this.isPosting = true;
    this.PropertyForm.markAllAsTouched();
    if (this.PropertyForm.valid) {
      const url = `${environment.url}party/edit`;
      const data = {
        Party_ID: this.PropertyForm.value.Party_ID,
        Name: this.PropertyForm.value.Name,
        Party_Type: this.PropertyForm.value.Party_Type,
        Salary: this.PropertyForm.value.Salary,
      };
      this.http.post(url, data).subscribe((response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.showEditToast = true;
        this.isPosting = false;
        this.ngOnInit();
      });
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.properties.slice(startIndex, startIndex + this.pageSize);
  }

  get form() {
    return this.PropertyForm.controls;
  }
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "lg", centered: true });
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.properties.filter(
      (data: { Party_ID: any }) => data.Party_ID === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.Party_ID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.PropertyForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }
  checkedValGet: any[] = [];
  deleteId: any;
  // delete(party: any) {
  //   if (party) {
  //     var listData = this.districties.filter(
  //       (data: { Party_ID: any }) => data.Party_ID === party
  //     );
  //     if (listData.length > 0) {
  //       const rowData = listData[0];
  //       const editFormFieldValue = rowData.Party_ID;
  //       console.log(editFormFieldValue);
  //       this.partyId = editFormFieldValue;
  //       console.log(this.partyId);
  //       this.service.delete(this.partyId).subscribe((response) => {
  //         this.modalService.dismissAll();
  //         this.showSuccessToast = true;
  //         this.ngOnInit();
  //       });
  //     } else {
  //       this.checkedValGet.forEach((item: any) => {
  //         document.getElementById("lj_" + item)?.remove();
  //       });
  //     }
  //   }
  // }
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.properties.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
