import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SchoolData } from './school-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-school',
  imports: [AsyncPipe],
  templateUrl: './school.html',
  styleUrl: './school.scss'
})
export class School {
  schools$: Observable<SchoolData[]>;
  constructor(http: HttpClient){
    this.schools$ = http.get<SchoolData[]>(`${environment.apiUrl}/api/Schools`);
  }
}
