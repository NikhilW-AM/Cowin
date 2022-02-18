import { TestBed } from '@angular/core/testing';

import { FetchcowindataService } from './fetchcowindata.service';

describe('FetchcowindataService', () => {
  let service: FetchcowindataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchcowindataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
