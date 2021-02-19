import { TestBed } from '@angular/core/testing';

import { SongcrudService } from './songcrud.service';

describe('SongcrudService', () => {
  let service: SongcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
