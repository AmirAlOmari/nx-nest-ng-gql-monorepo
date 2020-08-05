import { TestBed } from '@angular/core/testing';

import { AuthModeResolveService } from './auth-mode-resolve.service';

describe('AuthModeResolveService', () => {
  let service: AuthModeResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModeResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
