import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, count } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  [x: string]: any;



  private apiUrl = config.apiUrl; // Replace with your Spring Boot backend URL
  constructor(private http: HttpClient, private localstorageService: LocalStorageService) { }


  createProfile(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl + '/profile/create', profileData);

  }

  updateProfile(pId: number, updatedProfile: any): Observable<any> {
    const surl = `${this.apiUrl}/profile/update/id/${pId}`;
    return this.http.post(surl, { ...updatedProfile, id: pId }, { responseType: "text" });
  }





 
  deleteProfile(id: number) {
    console.log(id)
    return this.http.get(`${this.apiUrl}/profile/delete/id/${id}`);
  }




  FetchingProfileDetailsById(pId: number): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/profile/get/id/${pId}`);
  }


  getAllProfiles(): Observable<any> {
     
    return this.http.get(`${this.apiUrl}/profile/get-all`);
  }

  getProfilesWithSearch(formData: any){
    return this.http.post(`${this.apiUrl}/profile/search`, formData);
  }

   

  getAllInfluencers(homeCeneterId?:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/profile/influencer/get-all-for-lb?hc=${homeCeneterId}`);
  }


  importExcel(formData: any){
    const surl = `${this.apiUrl}/profile/import/excel`;
    return this.http.post(surl, formData );
  }

  downloadTemplate(){
    const surl = `${this.apiUrl}/profile/download/template`;
     
    return this.http.get(surl, {responseType: 'blob'});
         
  }

  

  

}
