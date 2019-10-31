import { TestBed } from '@angular/core/testing';

import { AgeDataService } from './age-data.service';

describe('AgeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgeDataService = TestBed.get(AgeDataService);
    expect(service).toBeTruthy();
  });
});
