import { ComponentFixture, TestBed } from '@angular/core/testing';
import { District } from './district';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('District', () => {
  let component: District;
  let fixture: ComponentFixture<District>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [District],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(District);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('District List');
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
    expect(headers[2].textContent).toContain('County');
  });
});
