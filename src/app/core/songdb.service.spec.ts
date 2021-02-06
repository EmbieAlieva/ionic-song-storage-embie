import { TestBed } from '@angular/core/testing';

import { SongdbService } from './songdb.service';

describe('SongdbService', () => {
  let service: SongdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongdbService);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy();
  });
});
