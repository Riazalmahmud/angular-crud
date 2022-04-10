import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpDataService } from '../services/http-data.service.spec';
import *as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Student } from '../models/student';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  @ViewChild('studentForm', { static: false })
  studentForm!: NgForm;
  studentData!: Student;
  dataSource = new MatTableDataSource();
  displayedCoulumns: string[] = [
    'id',
    'name',
    'age',
    'email',
    'mobile',
    'address',
    'action',
  ];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isEditMode = false;

  constructor(private HttpDataService: HttpDataService) {
    this.studentData = {} as Student;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllStudents();
  }
  getAllStudents() {
    this.HttpDataService.getList().subscrib((response: any) => {
      this.dataSource.data = response;
    })
  }
  editItem(element: any) {
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit() {
    this.isEditMode = false;
    this.studentData.resetForm();
  }

  deleteItem(id: any) {
    this.HttpDataService.deleteItem(id).subscrib((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      })
      console.log(this.dataSource.data)
    })
  }
}
