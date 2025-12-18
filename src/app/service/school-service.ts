import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DataModel {
  id?: number;
  name: string;
  districtId: number;
  mathScore: number;
  readingScore: number;
  writingScore: number;
  numTestTakers: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddSchoolService {
  private apiUrl =  environment.apiUrl + '/api/Schools'; 

  constructor(private http: HttpClient) { }

  postData(data: DataModel): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}