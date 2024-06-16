import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/pages/icons/toast-service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-district",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: "./district.component.html",
  styleUrl: "./district.component.scss",
})
export class DistrictComponent {
  DistrictForm!: FormGroup;
  districties: any[] = [];
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
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.DistrictForm = this.formBuilder.group({
      District_Name: ["", Validators.required],
    });

    this.fetchDistricList();
  }

  fetchDistricList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http.get<any[]>(`${environment.url}district`).subscribe((data) => {
      this.districties = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  createDistrict(): void {
    this.isPosting = true;
    this.DistrictForm.markAllAsTouched();
    if (this.DistrictForm.valid) {
      this.isLoading = true;
      const url = `${environment.url}district`;
      const data = {
        District_Name: this.DistrictForm.value.District_Name,
       
      };
      this.http.post(url, data).subscribe((response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.toastService.show("Successfully.", {
          classname: "bg-success text-center text-white",
          delay: 5000,
        });
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
    this.DistrictForm.markAllAsTouched();
    if (this.DistrictForm.valid) {
      const url = `${environment.url}party/edit`;
      const data = {
        Party_ID: this.DistrictForm.value.Party_ID,
        Name: this.DistrictForm.value.Name,
        Party_Type: this.DistrictForm.value.Party_Type,
        Salary: this.DistrictForm.value.Salary,
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
    return this.DistrictForm.controls;
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
      this.DistrictForm.patchValue(rowData);
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
    this.paginationDatas = this.districties.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
