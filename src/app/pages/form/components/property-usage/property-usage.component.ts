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
import { DistrictService } from "../service/district.service";

@Component({
  selector: "app-property-usage",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: "./property-usage.component.html",
  styleUrl: "./property-usage.component.scss",
})
export class PropertyUsageComponent {
  propertys: any[] = [];
  propertyForm!: FormGroup;
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
  isPosting = false;
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

  city_Id: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    public service: DistrictService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.formBuilder.group({
      id: [""],
      Usage: ["", Validators.required],
    });

    this.fetchPropertyList();
  }

  fetchPropertyList(): void {
    this.isLoading = true;
    // setTimeout(() => {
    this.http
      .get<any[]>(`${environment.url}propertyUsage`)
      .subscribe((data) => {
        this.propertys = data;
        console.log(data);
        this.isLoading = false;
      });
  }

  createPropertyUsage(): void {
    this.isPosting = true;
    this.submitted = true;
    this.propertyForm.markAllAsTouched();
    if (this.propertyForm.valid) {
      this.isLoading = true;
      const url = `${environment.url}propertyUsage`;
      const data = {
        Usage: this.propertyForm.value.Usage,
      };
      this.http.post(url, data).subscribe((response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.toastService.show("Successfully.", {
          classname: "bg-success text-center text-white",
          delay: 5000,
        });
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
    console.log(this.party);
    this.modalService.open(party, { centered: true });
  }

  EditPropertyUsage(): void {
    this.isPosting = true;
    this.submitted = true;
    this.propertyForm.markAllAsTouched();

    if (this.propertyForm.valid) {
      const propertyId = this.propertyForm.value.id; // Assuming the ID is stored in the form's 'id' field

      if (propertyId) {
        const url = `${environment.url}propertyUsage/${propertyId}`; // Construct URL with ID path segment

        this.http.put(url, this.propertyForm.value).subscribe(
          (response) => {
            console.log(response);
            this.modalService.dismissAll();
            this.showEditToast = true;
            this.isPosting = false;
            this.ngOnInit();
          },
          (error) => {
            // Handle error response from delete request
            console.error("Error deleting city:", error);
          }
        );
      } else {
        // Handle case where ID is not present in the form
        console.error("City ID is required for deletion.");
      }
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.propertys.slice(startIndex, startIndex + this.pageSize);
  }

  get form() {
    return this.propertyForm.controls;
  }
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.propertys.filter((data: { id: any }) => data.id === id);

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.id; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.propertyForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified city");
    }
  }
  checkedValGet: any[] = [];
  PropertyTypeId: any;
  deleteUsage(party: any) {
    if (party) {
      var listData = this.propertys.filter(
        (data: { Pro_Usage_ID: any }) => data.Pro_Usage_ID === this.party
      );

      if (listData.length > 0) {
        const rowData = listData[0];
        const editFormFieldValue = rowData.Pro_Usage_ID;
        console.log(editFormFieldValue);

        this.PropertyTypeId = editFormFieldValue;
        console.log(this.PropertyTypeId);
        this.service
          .deletePropertyUsage(this.PropertyTypeId)
          .subscribe((response) => {
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
    this.paginationDatas = this.propertys.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
