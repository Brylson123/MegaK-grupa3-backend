import { Injectable, ValidationPipe } from "@nestjs/common";
import { validate } from "class-validator";
import { CreateStudentDto } from "src/student/dto/createStudentDto";
import { plainToClass} from 'class-transformer';
import { AdminInsertStudent } from "../types";

@Injectable()
export class ValidateCreateStudent {
    async validateData(data: AdminInsertStudent): Promise<CreateStudentDto> {
        const validationPipe = new ValidationPipe();
        const transformedData = plainToClass(CreateStudentDto, data);
        const errors = await validate(transformedData, { skipMissingProperties: true });
    
        if (errors.length > 0) {
          // Handle validation errors as needed
          throw new Error(`Validation failed: ${errors.map(error => Object.values(error.constraints).join(', ')).join('; ')}`);
        }
    
        return transformedData;
      }
}
