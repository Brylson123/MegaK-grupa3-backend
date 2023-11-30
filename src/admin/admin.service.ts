import { Injectable } from '@nestjs/common';
import { AddStudentsDto } from './dto/addStudentsDto';
import { CreateHrDto } from 'src/hr/dto/create-hr.dto';
import { createReadStream, readFileSync} from 'fs';

@Injectable()
export class AdminService {
    parseCSV = () => {
        const csvFile = "data/dummyCSV.csv";
        console.log(csvFile);
        const results = [];
        const csv = require('csv-parser'); //Czy z tego można zrobić import?

        createReadStream(csvFile)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => console.log(results));
        //Nie wiem czemu nie mogę przeczytać tego pliku?
        //Error: ENOENT: no such file or directory, open 'C:\Users\rnowo\Documents\Informatyka\MegaK\Head Hunters\HH back\MegaK-grupa3-backend\data\dummyCSV.csv'
        return null;
    }
    
    addStudents() {
        this.parseCSV();
    }
    addHr(data: CreateHrDto) {
        throw new Error("Method not implemented.");
        //Myśle, że trzeba przenieść dodawianie HR do admina, HR nie potrzebuje sam się dodawać.
    }
}
