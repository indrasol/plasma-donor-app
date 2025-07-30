import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { usersettingsRoutes } from './usersettings.routing';
import { MyprofilecomponentComponent } from './myprofilecomponent/myprofilecomponent.component';


@NgModule({
  // declarations: [MyprofilecomponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(usersettingsRoutes),
    MyprofilecomponentComponent
  ]
})
export class UsersettingsModule { }
