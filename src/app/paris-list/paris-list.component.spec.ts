import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParisListComponent } from './paris-list.component';

describe('ParisListComponent', () => {
  let component: ParisListComponent;
  let fixture: ComponentFixture<ParisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
