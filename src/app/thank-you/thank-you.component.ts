import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerOlympicsApiService } from '../services/beer-olympics-api.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  paymentRequestId: string = '';
  paymentId: string = '';
  showThankyouMsg = false;

  constructor(private route: ActivatedRoute,
              private beerAPI: BeerOlympicsApiService,
              private shareService: SharingService) {
  }

  ngOnInit() {
    let tCont = document.querySelector('.thank-you-container') as HTMLElement;
    tCont.style.height = window.innerHeight+'px';
    this.route.queryParams.subscribe(params => {
        this.paymentRequestId = params['payment_request_id'];
        this.paymentId = params['payment_id'];
        setTimeout(() => {
          this.firePayCheck();
        });
    });
    //this.firePayCheck();
  }

  firePayCheck() {
    console.log('in');
    if (typeof this.paymentRequestId !== 'undefined' && this.paymentRequestId.trim() !== ''
      && typeof this.paymentId !== 'undefined' && this.paymentId.trim() !== '') {
      this.shareService.loadingEmit.emit({
        loading: true
      });
      let params = {
        'payment_request_id': this.paymentRequestId,
        'payment_id': this.paymentId
      };
      this.getPaymentStatus(params).then(
        (data) => {
          this.shareService.loadingEmit.emit({
            loading: false
          });

          if (data.payStatus === true) {
            this.showThankyouMsg  = true;
          } else {
            this.shareService.alertEmit.emit({
              showAlert: true,
              aText: data.payError,
              aType: 'error'
            });
          }
        }
      );
    } else {
      setTimeout(() => {
        this.shareService.alertEmit.emit({
          showAlert: true,
          aText: 'Invalid Payment Request received!',
          aType: 'error'
        });
      });

    }
  }

  async getPaymentStatus(params) {
    return await this.beerAPI.saveBeerTeam(params);
  }

}
