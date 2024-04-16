import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersService } from "src/app/pages/tables/listjs/listjs.service";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { ListJsModel } from "src/app/pages/tables/listjs/listjs.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AccountSubTypeService } from "../service/accountSubType.service";
import { ToastService } from "src/app/pages/icons/toast-service";

@Component({
  selector: "app-party-list",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: "./party-list.component.html",
  styleUrl: "./party-list.component.scss",
})
export class PartyListComponent {
  parties: any[] = [];
  partyForm!: FormGroup;
  submitted = false;
  showSuccessToast = false;
  showAddToast = false;
  showEditToast = false;
  page: any = 1;
  // pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 10;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  ListJsList!: Observable<ListJsModel[]>;
  // total: Observable<number>;
  partyTypes: string[] = ["Employee", "Customer", "Vendor"];
  editFormFieldValue: any;
  journal: any;
  partyId: any;

  isLoading = false;
  //new
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    public service: AccountSubTypeService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.partyForm = this.formBuilder.group({
      Party_ID: [""],
      Name: ["", Validators.required],
      Party_Type: ["", Validators.required],
      Salary: [null, Validators.required],
    });

    this.fetchPartyList();
  }

  fetchPartyList(): void {
    this.isLoading = true;
    // setTimeout(() => {
      this.http.get<any[]>(`${environment.url}party/list`).subscribe((data) => {
        this.parties = data;
        console.log(data);
        this.isLoading = false;
      });
      // Set loading flag to false after data arrives
    }
  
  

  createParty(): void {
    this.submitted = true;
    this.partyForm.markAllAsTouched();
    if (this.partyForm.valid) {
      this.isLoading = true;
      const url = `${environment.url}party/create`;
      const data = {
        Name: this.partyForm.value.Name,
        Party_Type: this.partyForm.value.Party_Type,
        Salary: this.partyForm.value.Salary,
      };
      this.http.post(url, data).subscribe((response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.toastService.show('Successfully.', { classname: 'bg-success text-center text-white', delay: 5000 });
      
        this.ngOnInit();
      });
    } else {
      this.isLoading = false;
      // Handle form validation errors here, e.g., display an error message.
    }
  }
  party: any;
  confirm(party: any, id: any) {
    this.party = id;

    this.modalService.open(party, { centered: true });
  }

  EditParty(): void {
    this.partyForm.markAllAsTouched();
    if (this.partyForm.valid) {
      const url = `${environment.url}party/edit`;
      const data = {
        Party_ID: this.partyForm.value.Party_ID,
        Name: this.partyForm.value.Name,
        Party_Type: this.partyForm.value.Party_Type,
        Salary: this.partyForm.value.Salary,
      };
      this.http.post(url, data).subscribe((response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.showEditToast = true;
        this.ngOnInit();
      });
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.parties.slice(startIndex, startIndex + this.pageSize);
  }

  get form() {
    return this.partyForm.controls;
  }
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.parties.filter(
      (data: { Party_ID: any }) => data.Party_ID === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.Party_ID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.partyForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }
  checkedValGet: any[] = [];
  deleteId: any;
  delete(party: any) {
    if (party) {
      var listData = this.parties.filter(
        (data: { Party_ID: any }) => data.Party_ID === party
      );

      if (listData.length > 0) {
        const rowData = listData[0];
        const editFormFieldValue = rowData.Party_ID;
        console.log(editFormFieldValue);

        this.partyId = editFormFieldValue;
        console.log(this.partyId);
        this.service.delete(this.partyId).subscribe((response) => {
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
    this.paginationDatas = this.parties.slice(this.startIndex - 1, this.endIndex);
  }
}
