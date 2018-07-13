import {
  HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams,
  HttpResponse
} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {}

  private handleError(error: HttpErrorResponse) {
    let myError = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      myError = 'Internet is not connected';
    } else {
      switch(error.status) {
        case 400:
          myError = 'Invalid request received!';
          if (typeof error.error.data !== 'undefined' && typeof error.error.data.error !== 'undefined' &&
          Object.keys(error.error.data.error).length > 0) {
            myError += '<br> Errors: <br>';
            Object.entries(error.error.data.error).forEach(
              ([key, val]) => {
                if (typeof val === 'string') {
                  myError += key+': '+ val;
                } else {
                  myError += key+': '+ val.join(',');
                }
              }
            )
          }
          break;
        case 401:
          myError = 'Authorization Failed!';
          break;
        case 404:
          myError = 'Resource Not Found!';
          break;
        case 405:
          myError = 'Method Not Allowed!';
          break;
        case 409:
          myError = 'Conflict with data on server!';
          break;
        case 500:
          myError = 'Server Error!';
          if (typeof error.error.meta !== 'undefined' && error.error.meta != '') {
            myError += '<br> Error Stack: <br>';
            let err = JSON.stringify(error.error.meta).substr(0,500);
            myError += err;
          }
          break;
        default:
          myError = 'Backend Server Not working: '+error.message;
      }
      myError += '<br>'+error.url;
      console.log('Error With status: ' + error.status + '<br> Message: ' + error.message);
      // /lms/analytics/error/
    }

    return new ErrorObservable(
      myError
    )
  }

  getRequest(url: string,
             customHeaders?: HttpHeaders,
             customParams?: HttpParams,
             respType?: 'json'): Observable<HttpResponse<any>> {
      return this.http.get(url, {
        headers: customHeaders,
        params: customParams,
        responseType: respType,
        observe: 'response'
      })
        .catch((error) => this.handleError(error));
  }

  postRequest(url: string,
               data: any,
               customHeaders?: HttpHeaders,
               customParams?: HttpParams,
               respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.post(url, data, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    })
      .catch((error) => this.handleError(error));
  }

  putRequest(url: string,
              data: any,
              customHeaders?: HttpHeaders,
              customParams?: HttpParams,
              respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.put(url, data, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    })
      .catch((error) => this.handleError(error));
  }

  deleteRequest(url: string,
             customHeaders?: HttpHeaders,
             customParams?: HttpParams,
             respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.delete(url, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    })
      .catch((error) => this.handleError(error));
  }

  postBlobRequest(url: string,
              data: any,
              customHeaders?: HttpHeaders,
              customParams?: HttpParams,
              respType?: 'json'): Observable<any> {
    return this.http.post(url, data, {
      headers: customHeaders,
      params: customParams,
      responseType: "blob",
      observe: "response"
    })
      .catch((error) => this.handleError(error));
  }
}
