import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './Student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students: Student[];
  public updateStudent: Student;
  public deleteStudent: Student;

  constructor(private studentService: StudentService ) {

  }

  ngOnInit(){
    this.getStudents();
  }

  public getStudents() : void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(student: Student, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById("main-container");
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if(mode === 'update') {
      this.updateStudent = student;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if(mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container.appendChild(button);
    button.click();

  }

  public onAddStudent(addForm: NgForm): void{
    document.getElementById('add-student-form').click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }

    );
  }

  public onUpdateStudent(student: Student): void{
    this.studentService.updateStudent(student).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public onDeleteStudent(studentId: number): void{
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public searchStudents(key: string): void {
    const results: Student[] = [];
    for (const student of this.students) {
      if(student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.field.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(student);
      }
    }
    this.students = results;
    if(results.length === 0 || !key){
      this.getStudents();
    }
  }

}
