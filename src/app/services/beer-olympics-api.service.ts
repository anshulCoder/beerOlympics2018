import {HttpService} from "./http.service";
import 'rxjs/Rx';
import {HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {reject, resolve} from "q";
import 'rxjs/add/operator/toPromise';
import {SharingService} from "./sharing.service";

const API_URL = 'http://beerolympics.in/BeerOlympicsold/'

@Injectable()
export class BeerOlympicsApiService {

  constructor(private httpService: HttpService,
              private shareService: SharingService) {}

  saveBeerTeam(params?: any): any {
    let whichAPI = 'thank_you';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.getRequest(API_URL+whichAPI,
        null,
        customParams)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.body);
          }
        )
        .catch(error => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: error,
            aType: 'error'
          });
        })
    });
    return promise;
  }

  verifyCoupon(postData: any,
             params?: any): any {
    let whichAPI = 'checkCoupon';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(API_URL+whichAPI,
        postData,
        null,
        customParams)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.body);
          }
        )
        .catch(error => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: error,
            aType: 'error'
          });
        })
    });
    return promise;
  }

  fetchPayLink(postData: any,
             params?: any): any {
    let whichAPI = 'submitBeerForm';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(API_URL+whichAPI,
        postData,
        null,
        customParams)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.body);
          }
        )
        .catch(error => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: error,
            aType: 'error'
          });
        })
    });
    return promise;
  }
}
