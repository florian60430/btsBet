import { TestBed } from '@angular/core/testing';

import { ParisService } from './paris.service';

describe('ParisService', () => {
  let service: ParisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
