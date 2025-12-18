import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSchool } from './add-school';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AddSchoolService } from '../service/school-service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddSchool', () => {
  let component: AddSchool;
  let fixture: ComponentFixture<AddSchool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSchool],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchool);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button until all fields are filled', async () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    // Initially invalid → disabled
    expect(button.disabled).toBeTrue();

    component.form.get('name')?.setValue('District A');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();

    component.form.get('districtId')?.setValue(2);
    component.form.get('mathScore')?.setValue(500);
    component.form.get('readingScore')?.setValue(410);
    component.form.get('writingScore')?.setValue(420);
    component.form.get('numTestTakers')?.setValue(30);
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should submit when form is valid', () => {
    const service = TestBed.inject(AddSchoolService);
    spyOn(service, 'postData').and.returnValue(of({}));

    component.form.setValue({ name: 'School A', 
                              districtId: 2,
                              mathScore: 400,
                              readingScore: 410,
                              writingScore: 420,
                              numTestTakers: 30 });
    component.onSubmit();

    expect(service.postData).toHaveBeenCalledWith({ name: 'School A', districtId: 2, mathScore: 400, readingScore: 410, writingScore: 420, numTestTakers: 30 });
    expect(component.submitSuccess).toBeTrue();
  });
});
