import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { NavBar } from './nav-bar';
import { provideHttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('NavBar', () => {
  let fixture: ComponentFixture<NavBar>;
  let component: NavBar;

  const isAuthenticated$ = new BehaviorSubject<boolean>(false);
  const authMock = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(false),
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async () => {
    isAuthenticated$.next(false);
    authMock.isLoggedIn.calls.reset();
    authMock.logout.calls.reset();

    await TestBed.configureTestingModule({
      imports: [NavBar, MatToolbarModule, MatButtonModule,MatIconModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([]),
        { provide: AuthService, useValue: authMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders nav links', () => {
    fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    fixture.detectChanges(); // second pass for zoneless
    
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBeGreaterThan(0);
  
  });
});