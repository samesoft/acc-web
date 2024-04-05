import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userService } from './userManagment.service';
import { User } from './user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule,],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  public Users: User[] = [];
  public roles:any[]=[];
  public page: any;
  public count = 6;
  submitted = false;
  public currentPage = 1;
  public itemsPerPage = 5;
  showAddToast= false
  p: number = 1;

  userForm!: FormGroup;
  public showPassword: boolean = false;
 
  loading=false;
  constructor(private userService:userService,  private router:Router, private modalService: NgbModal,   private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    
    this.getRoles()
    this.getUser();
    this.userForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      roleId: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
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
        console.log(this.Users)
      },
      error: (err) => {
        console.log(err)
        alert("Error while fetching the Records");
      },
    });
  }
  getRoles() {
    this.userService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res;
        console.log(this.roles)
      },
      error: (err) => {
        console.log(err)
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
      this.loading=true
      console.log("creating");
      this.userService.post(this.userForm.value).subscribe({
        next: (res) => {
          this.loading=false
          this.modalService.dismissAll();
          this.showAddToast= true;
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
  openModal(Add: any) {
    this.submitted = false;
    this.modalService.open(Add, { size: 'md', centered: true });
  }
}
