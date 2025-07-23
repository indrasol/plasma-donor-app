import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const Approutes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuard]
      },
        
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate:[AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./users/user.module').then(m => m.UserModule), canActivate:[AuthGuard]
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/report.module').then(m => m.ReportsModule), canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
