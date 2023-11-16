import { TestBed } from '@angular/core/testing';

import { GuildServiceService } from './guild-service.service';

describe('GuildServiceService', () => {
  let service: GuildServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
