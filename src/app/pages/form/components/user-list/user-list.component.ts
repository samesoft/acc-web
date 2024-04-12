import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { userService } from "./userManagment.service";
import { User } from "./user";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
  public Users: any[] = [];
  public roles: any[] = [];
  public page: any;
  public count = 6;
  submitted = false;
 
  startIndex: number = 0;
  endIndex: number = 10;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  showAddToast = false;
  p: number = 1;
  editFormFieldValue: any;
  userForm!: FormGroup;
  public showPassword: boolean = false;

  loading = false;
  //new
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;

  constructor(
    private userService: userService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getUser();
    this.userForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      roleId: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      password: ["", Validators.required],
    });
  }

  get form() {
    return this.userForm.controls;
  }

  getUser() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.Users = res;
        console.log(this.Users);
      },
      error: (err) => {
        console.log(err);
        alert("Error while fetching the Records");
      },
    });
  }
  getVisibleSchedules(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.Users.slice(startIndex, startIndex + this.pageSize);
  }
  getRoles() {
    this.userService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res;
        console.log(this.roles);
      },
      error: (err) => {
        console.log(err);
        alert("Error while fetching the Records");
      },
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  addUser() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.loading = true;
      console.log("creating");
      this.userService.post(this.userForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          this.modalService.dismissAll();
          this.showAddToast = true;
          this.ngOnInit();
          // this.toastr.success('User Added Successfully!');
          // this.router.navigate(['pages/users'])
        },
        error: () => {
          // this.toastr.error('Error occurred while adding the user.');
        },
      });
    }
  }
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = this.Users.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }

  editModa(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });

    // Filter the row data based on the ScheduleID
    var listData = this.Users.filter(
      (data: { userId: any }) => data.userId === id
    );

    // Assuming listData has only one row matching the ScheduleID
    if (listData.length > 0) {
      // Access the row data to set the value in the edit form field
      const rowData = listData[0]; // Get the first (and only) element
      const editFormFieldValue = rowData.Party_ID; // Replace YOUR_FIELD_NAME with the actual field name

      // Set the value of the edit form field, e.g., assigning to a variable or updating a form control
      this.editFormFieldValue = editFormFieldValue; // Update the value of editFormFieldValue with the actual form field variable
      this.userForm.patchValue(rowData);
      console.log(rowData); // Log the row data for verification
    } else {
      console.error("No data found for the specified ScheduleID");
    }
  }

  openModal(Add: any) {
    this.submitted = false;
    this.modalService.open(Add, { size: "md", centered: true });
  }
  party: any;
  confirm(user: any, id: any) {
    // this.party = id;

    this.modalService.open(user, { centered: true });
  }
}
