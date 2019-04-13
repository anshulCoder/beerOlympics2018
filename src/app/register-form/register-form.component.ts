import { Component, OnInit, ElementRef } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { NgForm } from '@angular/forms';
import { BeerOlympicsApiService } from '../services/beer-olympics-api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  tShirtSizes = [
    {value: '38 M', text: '38 M'},
    {value: '40 L', text: '40 L'},
    {value: '42 XL', text: '42 XL'},
    {value: '44 XXL', text: '44 XXL'}
  ];
  snackTypes = [
    {value: 1, text: 'Veg'},
    {value: 2, text: 'Non-Veg'}
  ];
  teamPrice = 8000;
  isCouponChecked = false;
  couponApplied = false;
  couponCode = '';
  couponAmt = 0;
  capMob = 0;

  constructor(private shareService: SharingService,
              private beerAPI: BeerOlympicsApiService) { }

  ngOnInit() {
    this.adjustMargin();
  }

  adjustMargin() {
    let headerHeight = document.querySelector('.navbar.fixed-top') as HTMLElement;
    let container = document.querySelector('.main-container') as HTMLElement;
    container.style.marginTop = headerHeight.offsetHeight+'px';
    setTimeout(() => {
      window.scrollTo(0,0);
    });
  }

  checkCoupon() {
    if (this.couponCode !== '') {
      this.shareService.loadingEmit.emit({
        loading: true
      });
      let pData = {
        couponCode: this.couponCode
      };
      this.validateCoupon(pData).then(
        (data)=> {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          if (data.status === true) {
            switch(data.couponType) {
              case 'Percentage':
                let perVal = +data.couponCost;
                let discount = Math.ceil((this.teamPrice * (perVal/100)));
                this.couponAmt = discount;
                this.couponApplied = true;
                this.shareService.alertEmit.emit({
                  showAlert: true,
                  aText: `Success! Rs ${discount} off!`,
                  aType: 'success'
                });
                break;
              case 'Amount':
                this.couponAmt = +data.couponCost;
                this.couponApplied = true;
                this.shareService.alertEmit.emit({
                  showAlert: true,
                  aText: `Success! Rs ${data.couponCost} off!`,
                  aType: 'success'
                });
                break;
            };

          } else {
            this.shareService.alertEmit.emit({
              showAlert: true,
              aText: data.errorMsg,
              aType: 'error'
            });
            return false;
          }
          console.log(data);
        }
      );
      //this.couponApplied = true;
      //this.couponAmt = 1000;
    } else {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Please Provide the coupon code!',
        aType: 'error'
      });
    }
  }

  registerTeam(mainForm: NgForm) {
    console.log(mainForm);
    if (mainForm.invalid) {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'All Fields are required!',
        aType: 'error'
      });
      return false;
    }

    let capAge = +mainForm.value['cap1Age'];
    // let athlete1Age = +mainForm.value['cap2Age'];
    // let athlete2Age = +mainForm.value['cap3Age'];
    // let athlete3Age = +mainForm.value['cap4Age'];
    if ( !(capAge >= 21 && capAge <= 99) ) {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Captain age must be above 21!',
        aType: 'error'
      });
      return false;
    }
    // if ( !(athlete1Age >= 21 && athlete1Age <= 99) ) {
    //   this.shareService.alertEmit.emit({
    //     showAlert: true,
    //     aText: 'Athlete 1 age must be above 21!',
    //     aType: 'error'
    //   });
    //   return false;
    // }
    // if ( !(athlete2Age >= 21 && athlete2Age <= 99) ) {
    //   this.shareService.alertEmit.emit({
    //     showAlert: true,
    //     aText: 'Athlete 2 age must be above 21!',
    //     aType: 'error'
    //   });
    //   return false;
    // }
    // if ( !(athlete3Age >= 21 && athlete3Age <= 99) ) {
    //   this.shareService.alertEmit.emit({
    //     showAlert: true,
    //     aText: 'Athlete 3 age must be above 21!',
    //     aType: 'error'
    //   });
    //   return false;
    // }
    if (this.couponApplied) {
      this.teamPrice -= this.couponAmt;
    }
    mainForm.value['finalPrice'] = this.teamPrice;
    console.log(mainForm.value);
    this.shareService.loadingEmit.emit({
      loading: true
    });
    this.getPaymentLink(mainForm.value).then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        if (data.status === true) {
          window.location.href= data.payUrl;
        } else {
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: data.errorMsg,
            aType: 'error'
          });
        }
      }
    );
  }

  clearCoupon() {
    this.isCouponChecked = false;
    this.couponCode = '';
    this.couponAmt = 0;
    this.couponApplied = false;
  }



  async validateCoupon(postData) {
    return await this.beerAPI.verifyCoupon(postData);
  }

  async getPaymentLink(postData) {
    return await this.beerAPI.fetchPayLink(postData);
  }
}
