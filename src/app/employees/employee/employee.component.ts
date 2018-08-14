import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL = '';

  constructor(
    private employeeService: EmployeeService,
    private afStorage: AngularFireStorage
  ) {
    this.employeeService.getData();
    // this.resetForm();
  }

  ngOnInit() {
  }

  onSubmit(employeeForm: NgForm) {
    this.employeeService.insertEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    // alert();
    // console.log(employeeForm.value);
  }

  resetForm(employeeForm: NgForm) {
    this.employeeService.seletedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }


  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('upload/'+id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    var me = this;
    this.task.then(function(data) {
      me.downloadURL = data.ref.getDownloadURL()['i'];
      var a = data.ref.getDownloadURL();
      a.then(function(data){
        me.downloadURL = data;
      });
    });
  }

}
