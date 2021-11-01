import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceViewComponent } from './annonce-view.component';

describe('AnnonceViewComponent', () => {
  let component: AnnonceViewComponent;
  let fixture: ComponentFixture<AnnonceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
