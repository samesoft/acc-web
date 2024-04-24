import { Component, Inject, QueryList, ViewChildren } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  Validators,
} from "@angular/forms";

// Sweet Alert
import Swal from "sweetalert2";

import { ListJsModel, paginationModel, scheduleModel } from "./listjs.model";
import {
  FuzzyList,
  dataattribute,
  existingList,
  paginationlist,
} from "src/app/core/data";
import { OrdersService } from "./listjs.service";
import {
  NgbdOrdersSortableHeader,
  listSortEvent,
} from "./listjs-sortable.directive";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { EditCargoComponent } from "../../cargo/edit-cargo/edit-cargo.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { CargoTableComponent } from "../../cargo/cargo-table/cargo-table.component";
import { ToastService } from "../../icons/toast-service";

@Component({
  selector: "app-listjs",
  templateUrl: "./listjs.component.html",
  styleUrls: ["./listjs.component.scss"],
  providers: [OrdersService, DecimalPipe],
})

/**
 * Listjs table Component
 */
export class ListjsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: UntypedFormGroup;
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

  //new
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  isLoading = false;
  isPosting = false;
  showSuccessToast = false;

  // Table data
  ListJsList!: Observable<scheduleModel[]>;
  total: Observable<number>;
  schedules: any[] = [];
  // schedules!: any[];
  parties: any[] = [];
  cities: any[] = [];
  @ViewChildren(NgbdOrdersSortableHeader)
  headers!: QueryList<NgbdOrdersSortableHeader>;

  editFormFieldValue: any;
  show = false;
  constructor(
    private modalService: NgbModal,
    public service: OrdersService,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    public toastService: ToastService
  ) {
    this.total = service.total$;
  }

  ngOnInit(): void {
    // this.getData(this.page, this.pageSize);
    this.getData();
    this.getParties();
    this.getCities();
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
    this.listJsForm = this.formBuilder.group({
      ScheduleID: [""],
      CityID: ["", [Validators.required]],
      Party_ID: ["", [Validators.required]],
      Kg: ["", [Validators.required]],
      Nbr: ["", [Validators.required]],
      Rate: ["", [Validators.required]],
      flight: "",
    });
    this.totalPages = Math.ceil(this.schedules.length / this.pageSize);

    /**
     * fetches data
     */
    // this.ListJsList.subscribe(x => {
    //   this.ListJsDatas = Object.assign([], x);
    // });

    // this.attributedata = dataattribute
    // this.existingData = existingList
    // this.fuzzyData = FuzzyList

    // this.paginationDatas = this.schedules
    // this.totalRecords = this.paginationDatas.length

    // this.startIndex = (this.page - 1) * this.pageSize + 1;
    // this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    // if (this.endIndex > this.totalRecords) {
    //   this.endIndex = this.totalRecords;
    // }
    // this.paginationDatas = this.schedules.slice(this.startIndex - 1, this.endIndex);
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
  }
  // pageChanged($event: any) {
  //   this.page = $event;
  //   this.getData(this.page, this.pageSize);
  // }

  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.schedules.slice(startIndex, startIndex + this.pageSize);
  }

  trackByScheduleId(index: number, schedule: any): number {
    return schedule.ScheduleID; // Use a unique identifier for tracking
  }
  // getData(page: number, pageSize: number) {
  //   this.http.get<any[]>(`${environment.url}schedule?page=${page}&size=${pageSize}`).subscribe((data) => {
  //     this.schedules = data;
  //     console.log(data);
  //   });
  // }

  getData() {
    this.isLoading = true;
    this.http.get<any[]>(`${environment.url}schedule`).subscribe((data) => {
      this.schedules = data;
      console.log(data);
      this.isLoading = false;
    });
    
  }

  fetchSchedules() {
    this.isLoading = true; // Set loading flag to true
    // Replace with your actual data fetching logic (e.g., HTTP service call)
    setTimeout(() => {
      this.http.get<any[]>(`${environment.url}schedule`).subscribe((data) => {
        this.schedules = data;
        console.log(data);
      });
      this.isLoading = false; // Set loading flag to false after data arrives
    }, 12000); // Simulate a 2-second delay (replace with actual API call duration)
  }

  getParties() {
    this.http.get<any[]>(`${environment.url}party/list`).subscribe((data) => {
      this.parties = data;
      console.log(data);
    });
  }
  getPartyName(partyId: string): string {
    const party = this.parties.find((p) => p.Party_ID === partyId);
    return party ? party.Name : "Unknown";
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
    return this.listJsForm.controls;
  }

  /**
   * Pagination
   */
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.schedules.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }

  /**
   * Save saveListJs
   */
  saveListJs() {
    if (this.listJsForm.valid) {
      if (this.listJsForm.get("ids")?.value) {
        this.ListJsDatas = this.ListJsDatas.map((data: { id: any }) =>
          data.id === this.listJsForm.get("ids")?.value
            ? { ...data, ...this.listJsForm.value }
            : data
        );
      } else {
        const customer_name = this.listJsForm.get("customer_name")?.value;
        const email = this.listJsForm.get("email")?.value;
        const phone = this.listJsForm.get("phone")?.value;
        const date = "14 Apr, 2021";
        const status_color = "success";
        const status = this.listJsForm.get("status")?.value;
        this.ListJsDatas.push({
          customer_name,
          email,
          phone,
          date,
          status_color,
          status,
        });
        this.modalService.dismissAll();
      }
    }
    this.modalService.dismissAll();
    setTimeout(() => {
      this.listJsForm.reset();
    }, 2000);
    this.submitted = true;
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
    var listData = this.schedules.filter(
      (data: { ScheduleID: any }) => data.ScheduleID === id
    );

    console.log(listData);
    // var updatebtn = document.getElementById('add-btn') as HTMLElement;
    // updatebtn.innerHTML = 'Update';
    // this.listJsForm.controls['customer_name'].setValue(listData[0].customer_name);
    // this.listJsForm.controls['email'].setValue(listData[0].email);
    // this.listJsForm.controls['phone'].setValue(listData[0].phone);
    // this.listJsForm.controls['date'].setValue(listData[0].date);
    // this.listJsForm.controls['status'].setValue(listData[0].status);
    // this.listJsForm.controls['ids'].setValue(listData[0].id);
  }
  // showSuccess() {
  //   this.show = true;

  // }

  // editSchedule(): void {

  //   if (this.listJsForm.valid) {
  //     this.http
  //     .put<any>(`${environment.url}schedule/edit`,this.listJsForm.value)
  //     .subscribe(data => {
  //       console.log(data)
  //       this.showSuccess();
  //     });
  //   }
  // }

  showSuccess() {
    this.show = true;
    setTimeout(() => {
      // Optional: You can remove this timeout if it's not necessary
    }, 100); // Adjust delay if needed
  }

  // editSchedule(): void {
  //   if (this.listJsForm.valid) {
  //     this.http
  //       .put<any>(`${environment.url}schedule/edit`, this.listJsForm.value)
  //       .subscribe(data => {
  //         console.log(data);
  //         this.showSuccessToast = true; // Set flag to show toast
  //       }, error => {
  //         console.error(error);
  //         // Handle errors (optional)
  //       });
  //   }
  // }

  editSchedule(): void {
    this.isPosting=true
    if (this.listJsForm.valid) {
      this.http
        .put<any>(`${environment.url}schedule/edit`, this.listJsForm.value)
        .subscribe(
          (data) => {
            console.log(data);
            // alert("succssfully edited");
            this.modalService.dismissAll();
            this.showSuccessToast = true;
            this.isPosting= false;
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
            this.toastService.remove("An error occurred!"); // Optional error notification
          }
        );
    }
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.schedules.filter(
      (data: { ScheduleID: any }) => data.ScheduleID === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.ScheduleID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.listJsForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }

  selectedAccount = "This is a placeholder";
  Default = [{ name: "Choice 1" }, { name: "Choice 2" }, { name: "Choice 3" }];
  /**
   * Sort table data
   * @param param0 sort the column
   *
   */

  onSort({ column, direction }: listSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.listsortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
