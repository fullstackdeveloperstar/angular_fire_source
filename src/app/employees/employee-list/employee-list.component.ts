import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private db: AngularFireDatabase,
  ) {   }

  ngOnInit() {
    // var x = this.employeeService.getData();
    // x.valueChanges().subscribe(item => {
    //   // this.employeeList = [];
    //   // item.forEach(element => {
    //   //   var y = element.payload.toJSON();
    //   //   y['$key'] = element.key;
    //   //   this.employeeList.push(y as Employee);
    //   // });
    // });
    var ref = this.db.database.ref('employees');
    ref.once('value').then(function (snapshot) {
      console.log(snapshot.toJSON());
    });

  }

}
