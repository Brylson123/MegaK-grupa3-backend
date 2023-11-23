import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { DatabaseModule } from 'src/database/database.module';
import { studentProviders } from './student.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [
    ...studentProviders,
    StudentService,
  ]
})
export class StudentModule {}
