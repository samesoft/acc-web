import { Injectable } from "@angular/core";
import { getFirebaseBackend } from "../../authUtils";
import { User } from "src/app/store/Authentication/auth.models";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { GlobalComponent } from "../../global-component";
import { Store } from "@ngrx/store";
import {
  RegisterSuccess,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from "src/app/store/Authentication/authentication.actions";
import { LoginForm } from "../models/LoginForms";
import { Account } from "src/app/account/login/login.model";
import { HttpApi } from "src/app/pages/form/components/service/http-api";
import { Router } from "@angular/router";
const AUTH_API = GlobalComponent.AUTH_API;
export type EntityResponseType = HttpResponse<Account>;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: "root" })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  user!: User;
  currentUserValue: any;

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store,  private router: Router,) {
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(sessionStorage.getItem("currentUser")!)
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(
    email: string,
    first_name: string,
    password: string,
    roleId: string
  ) {
   
    return this.http
      .post(
        AUTH_API + "user/register  ",
        {
          email,
          first_name,
          password,
          roleId,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const user = response;
          // return user;
          this.router.navigate(['/auth/login']); // Navigate to login page
        return user;
        }),
        catchError((error: any) => {
          const errorMessage = "Login failed"; // Customize the error message as needed
          this.store.dispatch(loginFailure({ error: errorMessage }));
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
    // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", " application/json");
    return this.http
      .post(
        AUTH_API + "user/login",
        {
          email,
          password,
        },
      
        
        httpOptions
      )
      .pipe(
        map((response: any) => {
          // const user = response;
          sessionStorage.setItem('token', response.data);
          // localStorage.setItem('token', JSON.stringify(response.data));
          return response;
          
        }),
        catchError((error: any) => {
          const errorMessage = "Login failed"; // Customize the error message as needed
          return throwError(errorMessage);
        })
      );
  }
  // loginWithUserCredentials(
  //   loginInfo: LoginForm
  // ): Observable<EntityResponseType> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-Type", " application/json");
  //   // headers = headers.set('Accept', ' application/json');
  //   const body = new URLSearchParams();
  //   return this.http
  //     .post<EntityResponseType>( AUTH_API + "user/login", loginInfo, { headers })
  //     .pipe(
  //       map((response: any) => {
  //         localStorage.setItem("token", JSON.stringify(response.data));
  //         localStorage.setItem("roles", JSON.stringify(response.roles));
  //         localStorage.setItem("userType", JSON.stringify(response.userType));

  //         localStorage.setItem("username", JSON.stringify(response.username));
  //         console.log("this is response" + response._id);
  //         localStorage.setItem("_id", JSON.stringify(response._id));
  //         // console.log("this is response" + response.access_token)

  //         return response;
  //       })
  //     );
  // }
  /**
   * Returns the current user
   */
  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  loginWithRefreshToken(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', ' application/json');
   
    return this.http
      .post(
        AUTH_API + "user/login",
        {
          email,
          password,
        },
      
        
        httpOptions
      )
      .pipe(
        map((response: any) => {
          // const user = response;
          sessionStorage.setItem('token', response.data);
          // localStorage.setItem('token', JSON.stringify(response.data));
          return response;
          
        }),
        catchError((error: any) => {
          const errorMessage = "Login failed"; // Customize the error message as needed
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Logout the user
   */
  logout() {
    this.store.dispatch(logout());
    // logout the user
    // return getFirebaseBackend()!.logout();
    // sessionStorage.removeItem("currentUser");
    // sessionStorage.removeItem("token");
    // this.currentUserSubject.next(null!);

    // return of(undefined).pipe();
   sessionStorage.removeItem('token');
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
  isLogged(): boolean {
    return sessionStorage.getItem('token') ? true : false;
    
  }
  get accessToken() {
    return localStorage["token"] ? JSON.parse(localStorage["token"]) : null;
  }
  getToken() {
    // Get the token value from sessionStorage in a get function
    return sessionStorage.getItem('token');
  }
}
