import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

/*
 *  There is not logic in the AuthService. It is really a wrapper round localstorage,
 *  which I don't want to test
 *
 *  This test therefore only tests for existence of the class
 */

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
