import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  res: any | null;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router,
    private authFackservice: AuthfakeauthenticationService, private route: ActivatedRoute, public toastService: ToastService) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // Login Api
    this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data: any) => {
      if (data.success == true) {
        sessionStorage.setItem('toast', 'true');
        // localStorage.setItem('token', JSON.stringify(data.data));
        // // sessionStorage.setItem('currentUser', JSON.stringify(data.data));
        // sessionStorage.setItem('token', data.data);
        // console.log(data.data)
        this.router.navigate(['/']);
      } else {
        this.toastService.show(data.message, { classname: 'bg-danger text-white', delay: 15000 });
      }
    });

  

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  // login() {
  //   const account = this.createFromForm();

  //   this.authenticationService.loginWithUserCredentials(account).subscribe({
  //     next: (result: any) => {
  //       this.res = result;
  //       // console.log(this.res);
  //       //console.log("this is me"+JSON.stringify(result))
  //       this.router.navigate(['/']);
  //     },
  //     error: () => {
       
  //     },
  //   });
  // }
  protected createFromForm(): any {
    return {
      username: this.loginForm.get(['email'])!.value,
      password: this.loginForm.get(['password'])!.value,
    };
  }
}
