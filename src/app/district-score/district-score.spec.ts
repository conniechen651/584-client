import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictScore } from './district-score';

describe('DistrictScore', () => {
  let component: DistrictScore;
  let fixture: ComponentFixture<DistrictScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictScore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictScore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
