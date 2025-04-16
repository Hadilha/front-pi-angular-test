import { TestBed } from '@angular/core/testing';

import { ContentProgramAjouterupdateService } from './content-program-ajouterupdate.service';

describe('ContentProgramAjouterupdateService', () => {
  let service: ContentProgramAjouterupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentProgramAjouterupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
