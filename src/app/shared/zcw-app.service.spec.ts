import { TestBed } from '@angular/core/testing';

import { ZcwAppService } from './zcw-app.service';

describe('ZcwAppService', () => {
  let service: ZcwAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZcwAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
