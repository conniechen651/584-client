import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { DistrictScore } from './district-score';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { By } from '@angular/platform-browser';

describe('DistrictScore', () => {
  let component: DistrictScore;
  let fixture: ComponentFixture<DistrictScore>;
  let httpMock: HttpTestingController;

  const mockDistrictId = '123';
  const mockDistrictData = {
    id: 123,
    name: 'Test District',
    county: 'Test County',
    mathScore: 85.5,
    readingScore: 88.2,
    writingScore: 82.7
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictScore],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? mockDistrictId : null
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DistrictScore);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display average math score', () => {
    fixture = TestBed.createComponent(DistrictScore);
    component = fixture.componentInstance;
    
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/Districts/score/${mockDistrictId}`);
    req.flush(mockDistrictData);

    fixture.detectChanges();

    const mathScore = fixture.debugElement.query(By.css('[data-testid="scores"]'));
    expect(mathScore?.nativeElement.textContent).toContain('85.5');
  });

  it('should display average reading score', () => {
    fixture = TestBed.createComponent(DistrictScore);
    component = fixture.componentInstance;
    
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/Districts/score/${mockDistrictId}`);
    req.flush(mockDistrictData);

    fixture.detectChanges();

    const readingScore = fixture.debugElement.query(By.css('[data-testid="scores"]'));
    expect(readingScore?.nativeElement.textContent).toContain('88.2');
  });

  it('should display average writing score', () => {
    fixture = TestBed.createComponent(DistrictScore);
    component = fixture.componentInstance;
    
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/Districts/score/${mockDistrictId}`);
    req.flush(mockDistrictData);

    fixture.detectChanges();

    const writingScore = fixture.debugElement.query(By.css('[data-testid="scores"]'));
    expect(writingScore?.nativeElement.textContent).toContain('82.7');
  });

});
