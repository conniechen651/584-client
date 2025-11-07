import { Component, OnInit } from '@angular/core';
import { ScoreData } from './score-data';
import { environment } from '../../environments/environment.development'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-district-score',
  imports: [RouterLink],
  templateUrl: './district-score.html',
  styleUrl: './district-score.scss'
})
export class DistrictScore implements OnInit {
  scoreData: ScoreData | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      let idParam = this.activatedRoute.snapshot.paramMap.get('id');
      this.http.get<ScoreData>(`${environment.apiUrl}/api/Districts/score/${idParam}`).subscribe(result => {
        this.scoreData = result;
      });
  }
}



