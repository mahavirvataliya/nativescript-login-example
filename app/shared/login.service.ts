import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { User } from "./user.model";
import { BackendService } from "./backend.service";
import { HttpService } from "./http.service";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(
      BackendService.baseUrl + "user/" + BackendService.appKey,
      JSON.stringify({
        username: user.email,
        email: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(catchError(this.handleErrors));
  }

  login(user: User) {
    return this.http.post(
      BackendService.baseUrl + "login",
      JSON.stringify({
        email: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(
      tap((data: any) => {
        BackendService.token = data.success.token;
        console.log( data );
      }),
      catchError(this.handleErrors)
    );
  }

  logoff() {
    BackendService.token = "";
  }

  resetPassword(email) {
    return this.http.post(
      BackendService.baseUrl + "rpc/" + BackendService.appKey + "/" + email + "/user-password-reset-initiate",
      {},
      { headers: this.getCommonHeaders() }
    ).pipe(catchError(this.handleErrors));
  }

  private getCommonHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
  }

  private handleErrors(error: HttpErrorResponse) {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
