import { TestBed } from '@angular/core/testing';

import { IssueReplyService } from './issue-reply.service';

describe('IssueReplyService', () => {
  let service: IssueReplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueReplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
