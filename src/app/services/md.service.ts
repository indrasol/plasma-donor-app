import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, count } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MdService {
   



  private apiUrl = config.apiUrl; // Replace with your Spring Boot backend URL
  constructor(private http: HttpClient, private localstorageService: LocalStorageService) { }


   


  getProfileMasterData(): Observable<any> {
     
    return this.http.get(`${this.apiUrl}/profile/md/get-all`);
  }

  getMasterDataByTypes(payload: any): Observable<any> {
     
    return this.http.post(`${this.apiUrl}/profile/md/get-by-types`, payload);
  }

}
