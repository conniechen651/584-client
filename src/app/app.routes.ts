import { Routes } from '@angular/router';
import { Home } from './home/home';
import { School } from './school/school';
import { District } from './district/district';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'school', component: School}, 
    {path: 'district', component: District}, 
];
