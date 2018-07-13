import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
              private sharingService: SharingService) { }

  ngOnInit() {
  }

  navToRegister(modal) {
    modal.hide();
    this.router.navigate(['register']);
  }

}
