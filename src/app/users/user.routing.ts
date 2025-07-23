import { Routes } from '@angular/router';
 
import { UserListComponent } from './list/user-list.component';


export const userRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'list',
				component: UserListComponent
			},
			 
		]
	}
];
