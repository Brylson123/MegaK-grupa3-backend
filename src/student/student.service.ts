import { Inject, Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/createStudentDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
	constructor(@Inject('STUDENT_REPOSITORY')
         private studentRepo: Repository<Student>) {}

	async findAll() {
		return await this.studentRepo.find();
	}

	async findOne(id: string) {
		return await this.studentRepo.findOne({ where: { id: id } });
	}

	async createStudent(createStudentDto: CreateStudentDto) {
        const student = await this.studentRepo.create(createStudentDto)
		return await this.studentRepo.save(student);
	}

	async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
		return await this.studentRepo.update(id, updateStudentDto);
	}
}
