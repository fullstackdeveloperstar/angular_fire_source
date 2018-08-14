import { TestBed, inject } from '@angular/core/testing';

import { EmployessService } from './employess.service';

describe('EmployessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployessService]
    });
  });

  it('should be created', inject([EmployessService], (service: EmployessService) => {
    expect(service).toBeTruthy();
  }));
});
