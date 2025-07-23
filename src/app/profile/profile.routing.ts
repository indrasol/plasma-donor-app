import { Routes } from '@angular/router';
 
import {   ProfileListComponent } from './list/profile-list.component';
 


export const profileRoutes: Routes = [
	{
		path: '',
		children: [
			 
			{
				path: 'list',
				component: ProfileListComponent
			},
			 
		]
	}
];
