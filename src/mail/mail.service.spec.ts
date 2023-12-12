import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from "@nest-modules/mailer";

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {provide: MailerService, useValue: {}}
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
