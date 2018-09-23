import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { BackendService } from "./backend.service";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    get(url: string) {
        return this.http.get(url, { headers: this.getCommonHeaders() });
    }

    post(url: string, data) {
        return this.http.post(url, data, { headers: this.getCommonHeaders() });
    }

    put(url, data) {
        return this.http.put(url , data, { headers: this.getCommonHeaders() });
    }

    delete(url) {
        return this.http.delete(url, { headers: this.getCommonHeaders() });
    }

    private getCommonHeaders() {
        return new HttpHeaders({
            "Authorization": "Bearer " + BackendService.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
    }

    private handleErrors(error: HttpErrorResponse) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
