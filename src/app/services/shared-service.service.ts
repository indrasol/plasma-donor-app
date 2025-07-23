import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private productDataSubject = new BehaviorSubject<any>(null);

  sendProductData(data: any): void {
    this.productDataSubject.next(data);
  }
  getProductData() {
    return this.productDataSubject.value;
  }
  
// common variable to the service
  SignupFormData:any|FormData;
// 
}

