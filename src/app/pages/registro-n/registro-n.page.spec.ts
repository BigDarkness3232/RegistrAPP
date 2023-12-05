import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroNPage } from './registro-n.page';

describe('RegistroNPage', () => {
  let component: RegistroNPage;
  let fixture: ComponentFixture<RegistroNPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroNPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
