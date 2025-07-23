import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { EmployeService } from 'src/app/services/employe.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private employService: EmployeService
  ) {}

  // End open close
  ngOnInit() {
    let cuser = this.employService.getCurrentUser();
    let sidebarRoutes = ROUTES;
    let fsidebarRoutes = [];
    fsidebarRoutes.push(sidebarRoutes[0]);
    if(cuser){
      if(cuser.role){
        if(cuser.role == 'Super User' || cuser.role == 'IT Engineer'){
          fsidebarRoutes.push(sidebarRoutes[1]);
          fsidebarRoutes.push(sidebarRoutes[2]);
          fsidebarRoutes.push(sidebarRoutes[3]);
        }else if(cuser.role == 'Data Entry User'){
          fsidebarRoutes.push(sidebarRoutes[2]);
        }else if(cuser.role == 'Location Admin'){
          fsidebarRoutes.push(sidebarRoutes[1]);
          fsidebarRoutes.push(sidebarRoutes[2]);
          fsidebarRoutes.push(sidebarRoutes[3]);
        }else if(cuser.role == 'Manager'){
          fsidebarRoutes.push(sidebarRoutes[3]);
        }else if(cuser.role == 'Director'){
          fsidebarRoutes.push(sidebarRoutes[3]);
        }else if(cuser.role == 'Marketing Head'){
          fsidebarRoutes.push(sidebarRoutes[3]);
        }else{

        }
      }
      this.sidebarnavItems = fsidebarRoutes;
    }
  }
}
