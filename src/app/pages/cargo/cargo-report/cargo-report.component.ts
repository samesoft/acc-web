import { Component, QueryList, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";

import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

// Sweet Alert
import Swal from "sweetalert2";

import {
  FuzzyList,
  dataattribute,
  existingList,
  paginationlist,
} from "src/app/core/data";
import { EditCargoComponent } from "../../cargo/edit-cargo/edit-cargo.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { CargoTableComponent } from "../../cargo/cargo-table/cargo-table.component";
import { ToastService } from "../../icons/toast-service";
import { ListJsModel } from "../../tables/listjs/listjs.model";
import {
  NgbdOrdersSortableHeader,
  listSortEvent,
} from "../../tables/listjs/listjs-sortable.directive";
import { OrdersService } from "../../tables/listjs/listjs.service";
import { userService } from "../../form/components/user-list/userManagment.service";
import { AccountSubTypeService } from "../../form/components/service/accountSubType.service";

@Component({
  selector: "app-cargo-report",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: "./cargo-report.component.html",
  styleUrl: "./cargo-report.component.scss",
})
export class CargoReportComponent {
  trips: any[] = [];

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  ListJsData!: ListJsModel[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;

  page: any = 1;
  // pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 10;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;

  showSuccessToast = false;
  showAddToast = false;
  showEditToast = false;

  Tid: any;
  //new
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;

  cargoForm!: UntypedFormGroup;
  cargoEditForm!: UntypedFormGroup;

  // Table data
  ListJsList!: Observable<ListJsModel[]>;
  // total: Observable<number>;
  schedules: any[] = [];
  parties: any[] = [];
  users: any[] = [];
  cities: any[] = [];
  @ViewChildren(NgbdOrdersSortableHeader)
  headers!: QueryList<NgbdOrdersSortableHeader>;
  editFormFieldValue: any;
  show = false;
  constructor(
    private modalService: NgbModal,
    // public service: OrdersService,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    public toastService: ToastService,
    private userService: userService,

    public service: AccountSubTypeService
  ) {
    // this.ListJsList = service.countries$;
    // this.total = service.total$;
  }

  ngOnInit(): void {
    this.getData();
    this.getParties();
    this.getCities();
    this.getUser();
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Tables" },
      { label: "Listjs", active: true },
    ];

    /**
     * Form Validation
     */
    this.cargoForm = this.formBuilder.group({
      City_From: ["", [Validators.required]],
      City_To: ["", [Validators.required]],
      Cont_No: ["", [Validators.required]],
      Party_ID: [""],
      Rate: ["", [Validators.required]],
      Truck_No: ["", [Validators.required]],
      Bkg_Date: ["", [Validators.required]],
      Dept_Date: ["", [Validators.required]],
      Com_Date: ["", [Validators.required]],
    });

    this.cargoEditForm = this.formBuilder.group({
      TID: [""],
      City_From: ["", [Validators.required]],
      City_To: ["", [Validators.required]],
      Cont_No: ["", [Validators.required]],
      Party_ID: ["", [Validators.required]],
      Rate: ["", [Validators.required]],
      Status: ["", [Validators.required]],
      Truck_No: ["", [Validators.required]],
      UserID: ["", [Validators.required]],
    });

    /**
     * fetches data
     */
    this.ListJsList.subscribe((x) => {
      this.ListJsDatas = Object.assign([], x);
    });

    this.attributedata = dataattribute;
    this.existingData = existingList;
    this.fuzzyData = FuzzyList;

    this.paginationDatas = paginationlist;
    this.totalRecords = this.paginationDatas.length;

    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }

  getData() {
    this.http.get<any[]>(`${environment.url}trips`).subscribe((data) => {
      this.trips = data;
      console.log(data);
    });
  }

  getParties() {
    this.http.get<any[]>(`${environment.url}party/list`).subscribe((data) => {
      this.parties = data;
      console.log(data);
    });
  }

  getUser() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
    });
  }

  getPartyName(partyId: string): string {
    const party = this.parties.find((p) => p.Party_ID === partyId);
    return party ? party.Name : "Unknown";
  }

  getUserName(UserId: string): string {
    const user = this.users.find((p) => p.userId === UserId);
    return user ? user.fullName : "Unknown";
  }
  getCityName(cityId: string): string {
    const city = this.cities.find((p) => p.CityID === cityId);
    return city ? city.City_Name : "Unknown";
  }
  getCities() {
    this.http.get<any[]>(`${environment.url}city`).subscribe((data) => {
      this.cities = data;
      console.log(data);
    });
  }

  /**
   * Form data get
   */
  get form() {
    return this.cargoForm.controls;
  }

  get formEdit() {
    return this.cargoEditForm.controls;
  }

  /**
   * Pagination
   */
  // loadPage() {
  //   this.startIndex = (this.page - 1) * this.pageSize + 1;
  //   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
  //   if (this.endIndex > this.totalRecords) {
  //     this.endIndex = this.totalRecords;
  //   }
  //   this.paginationDatas = paginationlist.slice(
  //     this.startIndex - 1,
  //     this.endIndex
  //   );
  // }

  saveCargo() {
    if (this.cargoForm.valid) {
      const formData = this.cargoForm.value;

      this.http.post<any>(`${environment.url}trips/create`, formData).subscribe(
        (data) => {
          console.log(data);
          // ... your success logic
        },
        (error) => {
          console.error(error);
          this.toastService.remove("An error occurred!"); // Optional error notification
        }
      );
      console.log("Request sent!"); // Added log to confirm request initiation
    }
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.ListJsDatas.forEach(
      (x: { state: any }) => (x.state = ev.target.checked)
    );
  }

  /**
   * Confirmation mail model
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      document.getElementById("lj_" + id)?.remove();
    } else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById("lj_" + item)?.remove();
      });
    }
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName("checkAll");
    var result;
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    } else {
      Swal.fire({
        text: "Please select at least one checkbox",
        confirmButtonColor: "#239eba",
      });
    }
    this.checkedValGet = checkedVal;
  }

  /**
   * Open modal
   * @param content modal content
   */
  editModal(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
    var listData = this.trips.filter((data: { TID: any }) => data.TID === id);

    console.log(listData);
  }

  showSuccess() {
    this.show = true;
    setTimeout(() => {
      // Optional: You can remove this timeout if it's not necessary
    }, 100); // Adjust delay if needed
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.trips.slice(this.startIndex - 1, this.endIndex);
  }

  getVisibleCargoReport(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.trips.slice(startIndex, startIndex + this.pageSize);
  }

  editCargo(): void {
    if (this.cargoEditForm.valid) {
      this.http
        .put<any>(`${environment.url}trips/edit`, this.cargoEditForm.value)
        .subscribe(
          (data) => {
            console.log(data);
            // alert("succssfully edited");
            this.showSuccessToast = true;
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
            this.toastService.remove("An error occurred!"); // Optional error notification
          }
        );
    }
  }

  createCargo(): void {
    this.cargoForm.markAllAsTouched();
    if (this.cargoForm.valid) {
      const url = `${environment.url}trips/create `;
      const data = {
        City_From: this.cargoForm.value.City_From,
        City_To: this.cargoForm.value.City_To,
        Rate: this.cargoForm.value.Rate,
        Bkg_Date: this.cargoForm.value.Bkg_Date,
        Dept_Date: this.cargoForm.value.Dept_Date,
        Com_Date: this.cargoForm.value.Com_Date,
        Truck_No: this.cargoForm.value.Truck_No,
        Cont_No: this.cargoForm.value.Cont_No,
        Party_ID: this.cargoForm.value.Party_ID,
      };
      this.http.post(url, data).subscribe((response) => {
        this.modalService.dismissAll();
        this.showAddToast = true;
        this.ngOnInit();
      });
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.trips.filter((data: { TID: any }) => data.TID === id);

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.TID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.cargoEditForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }

  delete(party: any) {
    if (party) {
      var listData = this.parties.filter(
        (data: { TID: any }) => data.TID === this.trips
      );

      if (listData.length > 0) {
        const rowData = listData[0];
        const editFormFieldValue = rowData.TID;
        console.log(editFormFieldValue);

        this.Tid = editFormFieldValue;
        console.log(this.Tid);
        this.service.delete(this.Tid).subscribe((response) => {
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
}
