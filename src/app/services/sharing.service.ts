import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class SharingService {

  loadingEmit = new EventEmitter<any>();
  alertEmit = new EventEmitter<any>();

  getAge(birthDate): any {
    let today = new Date();
    let bDate = new Date(birthDate);
    let age = today.getFullYear() - bDate.getFullYear();
    let m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate()))
    {
      age--;
    }
    return age;
  }

  getMonths(gotDate): any {
    let today = new Date();
    let bDate = new Date(gotDate);
    let age = today.getFullYear() - bDate.getFullYear();
    let m = today.getMonth() - bDate.getMonth();
    age = (age * 12) + m;
    return age;
  }
}
