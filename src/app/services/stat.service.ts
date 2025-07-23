import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatService {


    private apiUrl = config.apiUrl;
    private currentResSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public dashboardStats: Observable<any>;
    constructor(private http: HttpClient, private localstorageService: LocalStorageService) {
        this.dashboardStats = this.currentResSubject.asObservable();
    }

    getDashboardStats(): Observable<any> {

        return this.http.get(`${config.apiUrl}/stats/dashboard`).pipe(map((res: any) => {
            if (res.status) {
                this.currentResSubject.next(res.data);
            }
            return res;
        }));
    }

    getInfTreeData(formData?: any): Observable<any> {

        return this.http.post(`${config.apiUrl}/stats/inf-tree-data`, formData).pipe(map((res: any) => {
            if (res.status) {
                //this.currentResSubject.next(res.data);
            }
            return res;
        }));
    }

    getInfuencerStats(payload?: any) {
        return this.http.post(`${config.apiUrl}/stats/prof-stats-data`, payload).pipe(map((res: any) => {
            if (res.status) {
                //this.currentResSubject.next(res.data);
            }
            return res;
        }));
    
    }

    getAllInfluencerDetails(infId?: any) {
        return this.http.get(`${config.apiUrl}/stats/inf-details-data?infId=${infId}`).pipe(map((res: any) => {
            if (res.status) {
                //this.currentResSubject.next(res.data);
            }
            return res;
        }));
    
    }

    searchProfiles(formData?: any){
        if(!formData){
            formData = {};
        }
        return this.http.post(`${config.apiUrl}/stats/search-profiles`, formData).pipe(map((res: any) => {
            if (res.status) {
                //this.currentResSubject.next(res.data);
            }
            return res;
        }));
    }

    getDonorStatsForHeatMap(payload?: any) {
        return this.http.post(`${config.apiUrl}/stats/donor-heatm-data`, payload).pipe(map((res: any) => {
            if (res.status) {
                //this.currentResSubject.next(res.data);
            }
            return res;
        }));
    
    }

    




  }
