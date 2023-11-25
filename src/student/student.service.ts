import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/createStudentDto";
import { Student } from "./student.entity";


@Injectable()
export class StudentService {
	async findAll() {
		return await Student.find();
	}

	async findOne(id: string) {
		return await Student.findOne({ where: { id: id } });
	}

	async createStudent(createStudentDto: CreateStudentDto) {
        const student = await Student.create(createStudentDto)
		return await student.save();
	}

	async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
		return await Student.update(id, updateStudentDto);
	}
}
