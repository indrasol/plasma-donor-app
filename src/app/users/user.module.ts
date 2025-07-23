import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
 
import {   userRoutes } from './user.routing';
import { ComponentsModule } from '../components/components.module';
import { UserListComponent } from './list/user-list.component';

@NgModule({

  declarations: [
    UserListComponent

  ],


  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule,
    
  ],
})
export class UserModule { }
