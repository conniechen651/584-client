import { Routes } from '@angular/router';
import { Home } from './home/home';
import { School } from './school/school';
import { District } from './district/district';
import { DistrictScore } from './district-score/district-score'

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'school', component: School}, 
    {path: 'district', component: District}, 
    {path: 'district-score/:id', component:DistrictScore}
];
