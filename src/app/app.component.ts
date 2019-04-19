import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {SharingService} from "./services/sharing.service";
import { Meta } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  alertText = '';
  alertType = '';
  showAlert = false;
  isLoading = false;
  @ViewChild('customDataModal') customDataModal: ModalDirective;

  constructor(private router: Router,
              private sharingService: SharingService,
              private meta: Meta) {
    // this.meta.addTag({ name: 'description', content: 'Day Drinking Friends. Assemble. FOUR beer athletes. FIVE games. TEN litres of beer. Prizes galore.' });
    // this.meta.addTag({ name: 'title', content: 'Doolally Beer Olympics'});
    // this.meta.addTag({ name: 'url', content: 'http://beerolympics.in'});
    // this.meta.addTag({ name: 'image', content: 'http://beerolympics.in/assets/imgs/pong.png'});
    // this.meta.addTag({ name: 'og:description', content: 'Day Drinking Friends. Assemble. FOUR beer athletes. FIVE games. TEN litres of beer. Prizes galore.' });
    // this.meta.addTag({ name: 'og:title', content: 'Doolally Beer Olympics'});
    // this.meta.addTag({ name: 'og:url', content: 'http://beerolympics.in'});
    // this.meta.addTag({ name: 'og:image', content: 'http://beerolympics.in/assets/imgs/pong.png'});
  }

  ngOnInit() {

    this.sharingService.loadingEmit.subscribe(
      (data) => {
        if (data.loading === true) {
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      }
    );

    this.sharingService.alertEmit.subscribe(
      (data) => {
        if (data.showAlert === true) {
          this.showAlert = true;
          this.alertType = data.aType;
          this.alertText = data.aText;
          this.fadeAlertAway();
        }
      }
    );

    this.sharingService.openTnC.subscribe(
      (data) => {
        this.customDataModal.show();
      }
    );
  }

  fadeAlertAway() {
    setTimeout(() => {
      this.showAlert = false;
    }, 10000);
  }

  navToRegister(modal) {
    modal.hide();
    this.router.navigate(['register']);
  }
}
