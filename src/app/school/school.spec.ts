import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { School } from './school';

describe('School', () => {
  let component: School;
  let fixture: ComponentFixture<School>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [School],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(School);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('School List');
  });

  it('should render a table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should have table headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('table thead th');
    expect(headers.length).toBeGreaterThan(0);
    expect(headers[0].textContent).toContain('Id');
    expect(headers[1].textContent).toContain('Name');
    expect(headers[2].textContent).toContain('District ID');
    expect(headers[3].textContent).toContain('Math Score');
    expect(headers[4].textContent).toContain('Reading Score');
    expect(headers[5].textContent).toContain('Writing Score');
    expect(headers[6].textContent).toContain('Number of Test Takers');
  });
});