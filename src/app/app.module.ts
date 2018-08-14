import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractComponent } from './contracts/contract/contract.component';
import { ContractService } from './contracts/contract.service';


export const firebaseConfig = {
  // apiKey: 'AIzaSyA1ktbggFjkecBf_5tGpNJ-IZSWxfrH7Gc',
  // authDomain: 'fir-angular-54be3.firebaseapp.com',
  // databaseURL: 'https://fir-angular-54be3.firebaseio.com',
  // projectId: 'fir-angular-54be3',
  // storageBucket: 'fir-angular-54be3.appspot.com',
  // messagingSenderId: '253969748614'
  apiKey: "AIzaSyCesNh1gNmyMcepb60Hu4vj4qovBjWTcms",
  authDomain: "remedium-ed376.firebaseapp.com",
  databaseURL: "https://remedium-ed376.firebaseio.com",
  projectId: "remedium-ed376",
  storageBucket: "remedium-ed376.appspot.com",
  messagingSenderId: "110623256059"
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    LoginComponent,
    ContractsComponent,
    ContractComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthService,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
