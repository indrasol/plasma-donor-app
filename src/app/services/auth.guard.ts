import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeService } from './employe.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser :any = null;

  constructor( private router: Router, private employeeService: EmployeService) {
      this.employeeService.currentUser.subscribe(user=>{
        this.currentUser = user;
      })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
     
    
    if(this.currentUser && this.currentUser.token){
      console.log('routing');
      return true
    } else {
      console.log('routing to login');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
