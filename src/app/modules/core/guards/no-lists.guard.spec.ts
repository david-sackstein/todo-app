import { TestBed } from '@angular/core/testing';

import { NoListsGuard } from './no-lists.guard';

describe('NoListsGuard', () => {
  let guard: NoListsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoListsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
