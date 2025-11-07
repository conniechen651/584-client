import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DistrictData } from './district-data';
import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-district',
  imports: [RouterLink],
  templateUrl: './district.html',
  styleUrl: './district.scss'
})
export class District {
  districts: DistrictData[] = [];
  constructor(http: HttpClient){
    http.get<DistrictData[]>(`${environment.apiUrl}/api/Districts`).subscribe(result => {
      this.districts = result;
    });
  }
}
