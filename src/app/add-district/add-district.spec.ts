import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AddDistrict } from './add-district';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddDistrictService } from '../service/district-service';
import { of } from 'rxjs';

describe('AddDistrict', () => {
  let component: AddDistrict;
  let fixture: ComponentFixture<AddDistrict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddDistrict],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistrict);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should disable submit button until both fields are filled', async () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    // Initially invalid → disabled
    expect(button.disabled).toBeTrue();

    component.form.get('name')?.setValue('District A');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();

    component.form.get('county')?.setValue('County X');
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should submit when form is valid', () => {
    const service = TestBed.inject(AddDistrictService);
    spyOn(service, 'postData').and.returnValue(of({}));

    component.form.setValue({ name: 'District A', county: 'County X' });
    component.onSubmit();

    expect(service.postData).toHaveBeenCalledWith({ name: 'District A', county: 'County X' });
    expect(component.submitSuccess).toBeTrue();
  });
});
