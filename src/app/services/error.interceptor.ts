import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

 
import { Toast, ToastrService } from 'ngx-toastr';
 
import { EmployeService } from './employe.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private employeeService: EmployeService, private toaster: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log('err'+ err.status);
            if(err.status === 0){
              this.toaster.error("Network failed / You are offline!");
              
            }else if (err.status === 401) {
                // auto logout if 401 response returned from api
                // required to load a pop up saying the session expired and need to relogin
                this.employeeService.logOut();
                this.toaster.info('Session Expired !!');
                //location.reload();
            }else if(err.status === 403){
                this.toaster.info('Your access got blocked!');
            }
            
            const error = err.error?.message || err.statusText || err.status;
            return throwError (()=> error);
        }))
    }
}