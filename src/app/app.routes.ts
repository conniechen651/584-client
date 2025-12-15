import { Routes } from '@angular/router';
import { Home } from './home/home';
import { School } from './school/school';
import { District } from './district/district';
import { DistrictScore } from './district-score/district-score'
import { AddDistrict } from './add-district/add-district';
import { AddSchool } from './add-school/add-school';
import { Login } from './auth/login';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'school', component: School}, 
    {path: 'district', component: District}, 
    {path: 'district-score/:id', component:DistrictScore},
    {path: 'add-district', component:AddDistrict},
    {path: 'add-school',  component:AddSchool},
    {path: 'login', component: Login}
];
