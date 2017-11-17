
import { Routes } from '@angular/router'

import { AuthGuard } from './guards/auth.guard';

import {
    DashboardComponent,
    SignInComponent,
    Error404Component
} from './ui';



export const AppRoutes: Routes = [

    {
        path: 'signin',
        component: SignInComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [AuthGuard]
    },

    {
        path: '404',
        component: Error404Component
    },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
]
