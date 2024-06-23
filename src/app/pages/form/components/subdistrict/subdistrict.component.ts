import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/pages/icons/toast-service';
import { environment } from 'src/environments/environment';
import { DistrictService } from '../service/district.service';

@Component({
  selector: 'app-subdistrict',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: './subdistrict.component.html',
  styleUrl: './subdistrict.component.scss'
})
export class SubdistrictComponent {
  SubDistrictForm!: FormGroup;
  districties: any[] = [];
  Subdistricties: any[] = [];
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
    private service : DistrictService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.SubDistrictForm = this.formBuilder.group({
      Sub_District: ["", Validators.required],
      DistrictID: ["", Validators.required]
    });

    this.fetchDistricList();
    this.fetchSubDistrictList();
  }

  fetchDistricList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}subDistrict`).subscribe((data) => {
      this.districties = data;
      console.log(data);
      this.isLoading = false;
    });
  }
  fetchSubDistrictList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}subDistrict`).subscribe((data) => {
      this.Subdistricties = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  createDistrict(): void {
    this.isPosting = true;
    this.SubDistrictForm.markAllAsTouched();
    if (this.SubDistrictForm.valid) {
      this.isLoading = true;
      const url = `${environment.url}subDistrict`;
      const data = {
        Sub_District: this.SubDistrictForm.value.Sub_District,
        DistrictID: this.SubDistrictForm.value.DistrictID
      };
      this.http.post(url, data).subscribe((response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.showAddToast = true;
        this.isPosting = false;
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
    this.SubDistrictForm.markAllAsTouched();
    if (this.SubDistrictForm.valid) {
      const url = `${environment.url}party/edit`;
      const data = {
        Party_ID: this.SubDistrictForm.value.Party_ID,
        Name: this.SubDistrictForm.value.Name,
      
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
    return this.districties.slice(startIndex, startIndex + this.pageSize);
  }

  get form() {
    return this.SubDistrictForm.controls;
  }
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.districties.filter(
      (data: { Party_ID: any }) => data.Party_ID === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.Party_ID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.SubDistrictForm.patchValue(rowData);
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

  SUbDistrictId: any;
  deleteSubdistrict(party: any) {
    if (party) {
      var listData = this.Subdistricties.filter(
        (data: { ID: any }) => data.ID === this.party
      );

      if (listData.length > 0) {
        const rowData = listData[0];
        const editFormFieldValue = rowData.ID;
        console.log(editFormFieldValue);

        this.SUbDistrictId = editFormFieldValue;
        console.log(this.SUbDistrictId);
        this.service.deleteSubDistrict(this.SUbDistrictId).subscribe((response) => {
          this.modalService.dismissAll();
          this.showSuccessToast = true;
          this.ngOnInit();
        });
      } else {
        this.checkedValGet.forEach((item: any) => {
          document.getElementById("lj_" + item)?.remove();
        });
      }
    }
  }
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.districties.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
