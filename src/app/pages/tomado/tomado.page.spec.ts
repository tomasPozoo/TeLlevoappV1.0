import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomadoPage } from './tomado.page';

describe('TomadoPage', () => {
  let component: TomadoPage;
  let fixture: ComponentFixture<TomadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TomadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
