import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from "rxjs";

import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";
import { environment } from "../../../environments/environment";
import { HttpApi } from "src/app/pages/form/components/service/http-api";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  email: string = "";
  password: string = "";
  refreshTokenInProgress!: boolean;
  refreshTokenSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  id: any = "100";
  constructor(
    private authenticationService: AuthenticationService,
    private authfackservice: AuthfakeauthenticationService
  ) {}
  // private isAuthenticationRequired(apiUrl: string): boolean {
  //     const blockedApiList = [HttpApi.oauthLogin];
  //     return blockedApiList.includes(apiUrl) ? false : true;
  //   }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(this.performRequest(req))
      .pipe(catchError((err) => this.processRequestError(err, req, next)));
  }
  private JsonApi(apiUrl: string): any {
    var editAPi = apiUrl.substring(0, apiUrl.lastIndexOf("/") + 1);
    // console.log(editAPi);
    // console.log("editAPi");
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;

    if (this.isAuthenticationRequired(req.url)) {
      if (this.JsonApi(req.url)) {
        headers = headers.set("Content-Type", " application/json");
        headers = headers.set("Accept", " application/json");
        headers = headers.set("Access-Control-Allow-Headers", "content-type");
        // console.log("Json");
      }

      headers = headers.set(
        "Authorization",
        ` Bearer ${this.authenticationService.accessToken}`
      );
    }

    return req.clone({ headers });
  }
  // private processRequestError(
  //   error: HttpErrorResponse,
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   if (error.status === 401 && this.authenticationService.isLogged()) {
  //   //   return this.tryAgainWithRefresToken(req, next);
  //   }

  //   return throwError(error);
  // }
  private processRequestError(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (error.status === 401 && this.authenticationService.isLogged()) {
      return this.tryAgainWithRefresToken(req, next);
    }

    return throwError(error);
  }

  private isAuthenticationRequired(apiUrl: string): boolean {
    const blockedApiList = [HttpApi.oauthLogin];
    return blockedApiList.includes(apiUrl) ? false : true;
  }

  private tryAgainWithRefresToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.refreshTokenInProgress) {
      // Set the refreshToknSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      this.refreshTokenInProgress = true;

      return this.authenticationService
        .loginWithRefreshToken(this.email, this.password)
        .pipe(
          switchMap((result) => {
            if (result) {
              this.refreshTokenSubject.next(result);
              return next.handle(this.performRequest(req));
            }

            throw new Error("Acceso denegado.");
          }),
          catchError((error) => {
            this.authenticationService.logout();
            return throwError(error);
          }),
          finalize(() => {
            this.refreshTokenInProgress = false;
          })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result != null),
        take(1),
        switchMap(() => next.handle(this.performRequest(req)))
      );
    }
  }
}
