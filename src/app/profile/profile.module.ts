import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
 
import { profileRoutes } from './profile.routing';
import { ProfileListComponent } from './list/profile-list.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule
     
  ],
  declarations: [
    ProfileListComponent,
  ]
})
export class ProfileModule { }
