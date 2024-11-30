import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopPage } from './cop.page';

describe('CopPage', () => {
  let component: CopPage;
  let fixture: ComponentFixture<CopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
