import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/createStudentDto';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Student> {
        return this.studentService.findOne(id);
    }

    @Get()
    findAll(): Promise<Student[]> {
        return this.studentService.findAll();
    }

    @Post()
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }
    
    @Put(':id')
    updateStudent(@Param('id') id:string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.updateStudent(id, updateStudentDto);
    }
}
