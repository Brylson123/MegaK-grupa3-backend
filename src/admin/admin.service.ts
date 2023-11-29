import { Injectable } from '@nestjs/common';
import { AddStudentsDto } from './dto/addStudentsDto';
import { CreateHrDto } from 'src/hr/dto/create-hr.dto';

@Injectable()
export class AdminService {
    addStudents(data: AddStudentsDto) {
        throw new Error("Method not implemented.");
    }
    addHr(data: CreateHrDto) {
        throw new Error("Method not implemented.");
        //Myśle, że trzeba przenieść dodawianie HR do admina, HR nie potrzebuje sam się dodawać.
    }
}
