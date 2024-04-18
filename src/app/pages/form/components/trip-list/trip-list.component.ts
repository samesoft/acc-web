import { Component } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/pages/icons/toast-service";
import { environment } from "src/environments/environment";
import { userService } from "../user-list/userManagment.service";
import { FlatpickrModule } from "angularx-flatpickr";

@Component({
  selector: "app-trip-list",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule,
    FlatpickrModule],
  templateUrl: "./trip-list.component.html",
  styleUrl: "./trip-list.component.scss",
})
export class TripListComponent {
  isLoading = false;
  submitted = false;
  trips: any[] = [];
  users: any[] = [];
  parties: any[] = [];
  showEditToast = false;
  page: any = 1;
  startIndex: number = 0;
  endIndex: number = 10;
  totalRecords: number = 0;
  TripForm!: FormGroup;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  editFormFieldValue: any;
  rowData: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: userService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchTripList();
    this.getUser();
    this.getParties();

    this.TripForm = this.formBuilder.group({
      TID: [""],
      Status: ["", Validators.required],
      Com_Date: [null, Validators.required],
    });
  }
  fetchTripList(): void {
    this.isLoading = true;
    this.http.get<any[]>(`${environment.url}trips`).subscribe((data) => {
      this.trips = data;
      console.log(data);
      this.isLoading = false;
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

  getUserName(UserId: string): string {
    const user = this.users.find((p) => p.userId === UserId);
    return user ? user.fullName : "Unknown";
  }
  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.trips.slice(startIndex, startIndex + this.pageSize);
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.trips.slice(this.startIndex - 1, this.endIndex);
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    var listData = this.trips.filter((data: { TID: any }) => data.TID === id);

    if (listData.length > 0) {
      const rowData = listData[0];
      const editFormFieldValue = rowData.TID;

      this.editFormFieldValue = editFormFieldValue;

      this.TripForm.patchValue(rowData);

      console.log(rowData);
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }
  editModal(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    const listData = this.trips.filter((data: { TID: any }) => data.TID === id);

    if (listData.length > 0) {
      this.rowData = listData[0];
      console.log(this.rowData);
      // Convert the date string to a JavaScript Date object
      const formattedDate = new Date(this.rowData.Com_Date.substring(0, 10)); // Assuming YYYY-MM-DD format

      // Use DatePipe to format the date for patching
      const formattedDateString = this.datePipe.transform(
        formattedDate,
        "MM/dd/yyyy"
      );
      console.log(formattedDateString);
      this.TripForm.patchValue({
        TID: this.rowData.TID,
        Status: this.rowData.Status,
        // Com_Date: formattedDateString,
      });
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }

  get form() {
    return this.TripForm.controls;
  }
  EditParty(): void {
    this.TripForm.markAllAsTouched();
    if (this.TripForm.valid) {
      const url = `${environment.url}trips/update-status`;
      const data = {
        TID: this.TripForm.value.TID,
        Status: this.TripForm.value.Status,
        Date_Finished: this.TripForm.value.Com_Date,
      };
      this.http.post(url, data).subscribe((response) => {
        console.log(response);
        this.modalService.dismissAll();
        // this.showEditToast = true;
        this.ngOnInit();
      });
    } else {
      // Handle form validation errors here, e.g., display an error message.
    }
  }
  
  Edit(): void {
    this.TripForm.markAllAsTouched();

    if (this.TripForm.valid) {
      const url = `${environment.url}trips/update-status`;
      const formattedDate = this.formatDate(this.TripForm.value.Com_Date); // Format date before sending

      const data = {
        TID: this.TripForm.value.TID,
        Status: this.TripForm.value.Status,
        Date_Finished: formattedDate
      };

      this.http.post(url, data).subscribe((response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.showEditToast = true;
        this.ngOnInit();
      });
    } else {
      // Handle validation errors here, e.g., display an error message.
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

    return `${year}-${month}-${day}`;
  }
}
