import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../environments/environment';
import { BehaviorSubject, Observable, count, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  [x: string]: any;

  private apiUrl = config.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public logOutSubject: BehaviorSubject<any>;
 
  public currentUser: Observable<any>;
  userInfo : any  =null;
  // private apiUrl = '${this.apiUrl}/user/adduser'; // Replace with your Spring Boot backend URL
  constructor(private http: HttpClient, private localstorageService: LocalStorageService) { 
    const cuser = localStorage.getItem('userdetail');
    let parsedUser = null;
    try {
      parsedUser = cuser ? JSON.parse(cuser) : null;
    } catch (e) {
      parsedUser = null;
    }
    this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
    this.logOutSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(u => {
      this.userInfo = u;
    });
  }

  getCurrentUser() {
     
    return this.userInfo;
  }
  createUser(adminData: any): Observable<any> {
    const surl = `${this.apiUrl}/user/adduser`;
    return this.http.post(surl, adminData);

  }
  loginEmployee(email: string, password: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/user/login`;
    const loginDetails = { email, password };
    return this.http.post(apiUrl, loginDetails).pipe(map( (userRes: any)  => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
 
      if(userRes.status){
        localStorage.setItem('userdetail', JSON.stringify(userRes.data));
        this.currentUserSubject.next(userRes.data);
      }else{
        this.currentUserSubject.next({});
      }
      return userRes;
    }));
  }
  // loginEmployee(email: string, password: string): Observable<any> {
  //   const apiUrl = `${this.apiUrl}/user/login`;
  //   const loginDetails = { email, password };
  //   const headers= {'Content-Type': 'application/json'};
  //   console.log("Sending Login Request:", loginDetails); 

  //   return this.http.post(apiUrl, loginDetails,{headers: { 'Content-Type': 'application/json' },
  //     withCredentials: true }).pipe(map( (userRes: any)  => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     console.log("API Response:", userRes);
  //     if(userRes?.token){
  //       localStorage.setItem('userdetail', JSON.stringify(userRes));
  //       this.currentUserSubject.next(userRes);
  //     }else{
  //       this.currentUserSubject.next({});
  //     }
  //     return userRes;
  //   }));
  // }

  // fetching details of all users including admin
  displayall(): Observable<any> {
    const apiUrl = `${this.apiUrl}/user/getemployees`;
    return this.http.get(apiUrl)
  }




  deleteUser(userId: number): Observable<any> {
    console.log(userId)
    const apiUrl = `${this.apiUrl}/user/delete-user/${userId}`;
    return this.http.get(apiUrl);
  }




  updateUser(userId: number, updatedUser: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/user/update/id/${userId}`;
    return this.http.put(apiUrl, { ...updatedUser, id: userId }, { responseType: "text" });
  }


  FetchingUserDetailsById(userId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/user/fetchUserDetailsById/id/${userId}`;
    return this.http.get<any>(apiUrl)
  }


  getAllEmployees(): Observable<any> {
    const apiurl = `${this.apiUrl}/user/employees`;
    return this.http.get(apiurl)
  }


  getAllActiveUsersCount(): Observable<any> {
    const apiurl = `${this.apiUrl}/user/activeUsersCount`;
    return this.http.get(apiurl)
  }
  getEmployeesCount(): Observable<any> {
    const apiurl = '${this.apiUrl}/user/activeEmployeesCount';
    return this.http.get(apiurl)
  }
  getAdminCount(): Observable<any> {
    const apiurl = '${this.apiUrl}/user/adminCount';
    console.log("admin count", this.http.get(apiurl));
    return this.http.get(apiurl)
  }

  getAllCompanyLocations(): Observable<any> {
    const surl = `${this.apiUrl}/user/company/locations`;
    return this.http.get(surl)
  }
  getAllRoles(): Observable<any> {

    const surl = `${this.apiUrl}/user/role`;

    return this.http.get(surl)
  }

  logOut(){
    console.log('logout called');
    this.currentUserSubject.next(null);
    this.localstorageService.removeItem('userdetail');
    this.localstorageService.clear();
    this.logOutSubject.next("loggedOut");
  }

  public setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

}
