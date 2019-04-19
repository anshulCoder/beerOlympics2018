import { Component, OnInit } from '@angular/core';
import {SharingService} from "../services/sharing.service";
//import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //defaultSlideCount = 1;
  // sliderConfig : SwiperConfigInterface = {
  //   slidesPerView: this.defaultSlideCount,
  //   loop: true
  // };
  // sliderNewConfig: SwiperConfigInterface = {
  //   autoplay: false,
  //   loop: true
  // };

  constructor(private sharingService: SharingService) {

  }


  ngOnInit() {
    // setTimeout(() => {
    //   console.log('in');
    //   this.adjustMargin();
    // }, 100);
  }

  showTnC() {
    this.sharingService.openTnC.emit();
  }

  adjustMargin() {
    let headerHeight = document.querySelector('.navbar.fixed-top') as HTMLElement;
    let container = document.querySelector('.main-container') as HTMLElement;
    container.style.marginTop = (headerHeight.offsetHeight-5)+'px';
  }

}
