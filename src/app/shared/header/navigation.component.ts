import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public currentUserInfo : any = {}

  constructor(private modalService: NgbModal, private localStorageService: LocalStorageService,
    private employeService: EmployeService,
    private router: Router

  ) {
    console.log(' header navigation::');
    this.employeService.currentUser.subscribe(u=>{
      this.currentUserInfo = u;
    });
    this.employeService.logOutSubject.asObservable().subscribe(l=>{
       if(l && l == 'loggedOut'){
        this.router.navigate(['/login']);
        this.employeService.logOutSubject.next(null);
       }
    })
    
  }

 

 
   

   

  ngAfterViewInit() { }

  logout(){
    this.employeService.logOut();
    
  }

  goToProfile() {
    this.router.navigate(['/my-profile']);
  }
}
