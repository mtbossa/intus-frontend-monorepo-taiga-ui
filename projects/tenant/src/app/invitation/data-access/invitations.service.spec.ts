import { TestBed } from "@angular/core/testing";

import { InvitationsService } from "./invitations.service";

describe("InvitationsService", () => {
  let service: InvitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
