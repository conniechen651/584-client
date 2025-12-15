import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DistrictData } from './district-data';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-district',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './district.html',
  styleUrl: './district.scss'
})
export class District {
  districts$: Observable<DistrictData[]>;
  
  constructor(http: HttpClient){
    this.districts$ = http.get<DistrictData[]>(`${environment.apiUrl}/api/Districts`);
  }
}
