import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomecPage } from './homec.page';

describe('HomePage', () => {
  let component: HomecPage;
  let fixture: ComponentFixture<HomecPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomecPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
