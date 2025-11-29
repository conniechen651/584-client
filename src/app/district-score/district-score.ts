import { Component, OnInit } from '@angular/core';
import { ScoreData } from './score-data';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-district-score',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './district-score.html',
  styleUrl: './district-score.scss'
})
export class DistrictScore implements OnInit {
  score$: Observable<ScoreData | null> = of(null);

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.score$ = this.http
      .get<ScoreData>(`${environment.apiUrl}/api/Districts/score/${idParam}`)
      .pipe(
        catchError(err => {
          console.error('Failed to load score', err);
          return of(null);
        })
      );
  }
}



