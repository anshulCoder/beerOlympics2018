import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    keyboard: false,
    ignoreBackdropClick: true,
    class: 'age-modal'
  };

  constructor(private modalService: BsModalService) {

    setTimeout(() => {
      if (this.getLocal("ageGateGone") == null) {
        let btnShow = document.querySelector('#showModal') as HTMLElement;
        btnShow.click();
      }
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  setAgeGone(template: TemplateRef<any>) {
    this.setLocal("ageGateGone", "1");
    this.modalRef.hide();
  }

  ngOnInit() {
  }

  getLocal(key) {
    if (typeof (Storage) == "undefined")
    {
      return false;
    }

    try
    {
      let record = JSON.parse(localStorage.getItem(key));
      if (!record)
      {
        return null;
      }
      if(new Date().getTime() < record.timestamp && JSON.parse(record.value) != null)
      {
        return JSON.parse(record.value);
      }
      else
      {
        return null;
      }
    }
    catch (e)
    {
      return null;
    }
  }

  setLocal(key, jsonData, expirationMS?) {

    if (typeof (Storage) == "undefined")
    {
      return false;
    }
    /*var expirationMS = expirationMin * 60 * 1000;*/
    if (typeof (expirationMS) == "undefined")
    {
      expirationMS = 24 * 60 * 60 * 1000;
    }
    let record =
      {
        value: JSON.stringify(jsonData),
        timestamp: new Date().getTime() + expirationMS
      };
    localStorage.setItem(key, JSON.stringify(record));
    return jsonData;
  }

}
