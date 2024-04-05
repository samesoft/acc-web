import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-cargo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-cargo.component.html',
  styleUrl: './edit-cargo.component.scss'
})
export class EditCargoComponent {
  Form!: UntypedFormGroup;
  submitted = false;
  constructor(private http: HttpClient, private dialog:MatDialog, private modalService: NgbModal, private formBuilder: FormBuilder) {
  }
  ngOnInit(){
    this.Form = this.formBuilder.group({
      ids: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      // phone: ['', [Validators.required]],
      // date: ['', [Validators.required]],
      // status: ['', [Validators.required]]
    });
  }

  get form() {
    return this.Form.controls;
  }
  
}
