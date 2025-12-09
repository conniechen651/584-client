import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DataModel {
  id?: number;
  name: string;
  county: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddDistrictService {
  private apiUrl =  environment.apiUrl + '/api/Districts'; 

  constructor(private http: HttpClient) { }

  postData(data: DataModel): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}